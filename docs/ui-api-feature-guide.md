# UI-as-API Architecture: Complete Feature Implementation Guide

## Overview

This guide demonstrates how to implement a complete feature using the UI-as-API architecture pattern. The core principle is that **UI components are pure presentation layers** that declare their data requirements through TypeScript interfaces, while all business logic, data fetching, and state management is handled by separate layers.

Think of UI components as "APIs" that expose exactly what data they need and what callbacks they accept, without knowing anything about how that data is fetched or what those callbacks do.

## Architecture Layers

### 1. **UI Schemas** - Data Contracts
TypeScript interfaces that define exactly what shape of data each UI component needs.

### 2. **Mapping Engine** - Data Transformation
Declarative JSON configurations that transform external API responses into UI-friendly schemas.

### 3. **Collections** - Data Storage
TanStack DB collections that handle caching, normalization, and optimistic updates.

### 4. **Action Hooks** - Business Logic
Custom hooks that encapsulate all business logic and return ready-to-use functions.

### 5. **Pure UI Components** - Presentation Only
Components that only render props and call callbacks - zero business logic.

### 6. **Container Components** - Orchestration
Thin components that connect data queries and action hooks to UI components.

---

# Complete Feature Example: User Profile with Posts

Let's implement a user profile feature that displays user information, follower stats, and allows following/unfollowing with a list of user posts that can be liked.

## Step 1: Define UI Schemas

First, define exactly what data structure your UI components need:

```typescript
// UI Schema - What the UI components expect
interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing: boolean;
}

interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  engagement: {
    likes: number;
    comments: number;
    isLiked: boolean;
  };
}
```

**Key Point**: These schemas represent the "ideal" data format for your UI, not what the API returns.

## Step 2: Create Mapping Configurations

Define how to transform external API data into your UI schemas:

```typescript
// Mapper for transforming API response to UserProfile schema
const userProfileMapper = {
  id: 'user_id',
  displayName: {
    path: 'profile.full_name',
    fallback: 'profile.first_name'
  },
  email: 'contact.email_address',
  avatarUrl: 'profile.avatar.large_url',
  stats: {
    posts: 'statistics.post_count',
    followers: 'statistics.follower_count',
    following: 'statistics.following_count'
  },
  isFollowing: {
    path: 'relationship.is_following',
    fallback: false
  }
};

const postMapper = {
  id: 'post_id',
  content: 'text_content',
  author: {
    id: 'author.user_id',
    name: 'author.display_name',
    avatar: 'author.profile_picture'
  },
  publishedAt: {
    path: 'created_timestamp',
    transform: (timestamp: number) => new Date(timestamp * 1000).toISOString()
  },
  engagement: {
    likes: 'metrics.like_count',
    comments: 'metrics.comment_count',
    isLiked: 'current_user_reaction.has_liked'
  }
};
```

**Key Point**: Mappers are declarative JSON that can be stored separately and updated without touching UI code.

## Step 3: Implement Mapping Engine

Create a generic engine that applies mapping configurations:

```typescript
// Generic path resolver with dot notation support
const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    
    // Handle array indices: users[0].name
    const arrayMatch = key.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, arrayKey, index] = arrayMatch;
      return current[arrayKey]?.[parseInt(index)];
    }
    
    return current[key];
  }, obj);
};

// Core mapping engine
class MapperEngine {
  static map<T>(externalData: any, mapperConfig: any): T {
    const result = {} as T;
    
    for (const [key, mapping] of Object.entries(mapperConfig)) {
      const value = this.processMapping(externalData, mapping);
      if (value !== undefined) {
        (result as any)[key] = value;
      }
    }
    
    return result;
  }

  private static processMapping(data: any, mapping: any): any {
    // Simple string path
    if (typeof mapping === 'string') {
      return getValueByPath(data, mapping);
    }
    
    // Object with path and options
    if (mapping.path) {
      let value = getValueByPath(data, mapping.path);
      
      // Apply transformation if provided
      if (mapping.transform && value !== undefined) {
        value = mapping.transform(value);
      }
      
      // Use fallback if value is undefined
      if (value === undefined && mapping.fallback !== undefined) {
        value = mapping.fallback;
      }
      
      return value;
    }
    
    // Nested object mapping
    if (typeof mapping === 'object' && !Array.isArray(mapping)) {
      return this.map(data, mapping);
    }
    
    return undefined;
  }
}
```

**Key Point**: The mapping engine is generic and works with any schema/mapper combination.

## Step 4: Set Up Data Collections

Create TanStack DB collections that handle data storage and API integration:

```typescript
import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

// API Client
class ApiClient {
  private baseUrl = 'https://api.example.com';
  
  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }
  
  async patch(endpoint: string, data: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }
}

const apiClient = new ApiClient();

// User Collection with integrated mapping
export const userCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const rawUsers = await apiClient.get('/users');
      // Transform using mapper engine
      return rawUsers.map((user: any) => 
        MapperEngine.map(user, userProfileMapper)
      );
    },
    getKey: (user: UserProfile) => user.id,
    
    // Optimistic updates with server sync
    onUpdate: async ({ transaction }) => {
      const { key: userId, modified: updates } = transaction.mutations[0];
      await apiClient.patch(`/users/${userId}`, updates);
    },
  })
);

// Posts Collection
export const postCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["posts"],
    queryFn: async () => {
      const rawPosts = await apiClient.get('/posts');
      return rawPosts.map((post: any) => 
        MapperEngine.map(post, postMapper)
      );
    },
    getKey: (post: Post) => post.id,
    
    onUpdate: async ({ transaction }) => {
      const { key: postId, modified: updates } = transaction.mutations[0];
      await apiClient.patch(`/posts/${postId}`, updates);
    },
  })
);
```

**Key Point**: Collections handle data transformation automatically using your mappers.

## Step 5: Create Data Query Hooks

Create hooks that provide clean data access:

```typescript
import { useLiveQuery } from "@tanstack/react-db";
import { eq } from "@tanstack/db";

// Hook for single user profile
export const useUserProfile = (userId: string) => {
  return useLiveQuery((query) =>
    query
      .from({ users: userCollection })
      .where(({ users }) => eq(users.id, userId))
      .selectOne()
  );
};

// Hook for user's posts
export const useUserPosts = (userId: string) => {
  return useLiveQuery((query) =>
    query
      .from({ posts: postCollection })
      .where(({ posts }) => eq(posts.author.id, userId))
      .orderBy(({ posts }) => posts.publishedAt, 'desc')
  );
};
```

**Key Point**: Query hooks provide reactive data that automatically updates when underlying data changes.

## Step 6: Implement Business Logic Actions

Create pure functions and action hooks that handle all business logic:

```typescript
// Pure business logic functions
class UserActions {
  static toggleFollow(userId: string, currentUser: UserProfile): UserProfile {
    return {
      ...currentUser,
      isFollowing: !currentUser.isFollowing,
      stats: {
        ...currentUser.stats,
        followers: currentUser.isFollowing 
          ? currentUser.stats.followers - 1 
          : currentUser.stats.followers + 1,
      },
    };
  }
}

class PostActions {
  static toggleLike(currentPost: Post): Post {
    return {
      ...currentPost,
      engagement: {
        ...currentPost.engagement,
        isLiked: !currentPost.engagement.isLiked,
        likes: currentPost.engagement.isLiked 
          ? currentPost.engagement.likes - 1 
          : currentPost.engagement.likes + 1,
      },
    };
  }
}

// Action hooks that encapsulate all business logic
export const useUserActions = (userId: string) => {
  const { data: user } = useUserProfile(userId);
  
  const followUser = React.useCallback(() => {
    if (!user) return;
    
    const updatedUser = UserActions.toggleFollow(userId, user);
    userCollection.update(userId, () => updatedUser);
  }, [userId, user]);
  
  return {
    followUser,
  };
};

export const usePostActions = (posts: Post[] | null = null) => {
  const likePost = React.useCallback((postId: string) => {
    const post = posts?.find(p => p.id === postId);
    if (!post) return;
    
    const updatedPost = PostActions.toggleLike(post);
    postCollection.update(postId, () => updatedPost);
  }, [posts]);
  
  return {
    likePost,
  };
};
```

**Key Point**: Action hooks contain ALL business logic and return ready-to-use functions.

## Step 7: Create Pure UI Components

Build components that only handle presentation:

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

// Pure UI Component - Only rendering and callbacks
interface UserProfileViewProps {
  user: UserProfile | null;
  posts: Post[] | null;
  isLoading: boolean;
  onFollow: () => void;
  onPostLike: (postId: string) => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ 
  user, 
  posts, 
  isLoading, 
  onFollow, 
  onPostLike 
}) => {
  if (isLoading) return <Text>Loading...</Text>;
  if (!user) return <Text>User not found</Text>;
  
  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        {user.avatarUrl && (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        )}
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        {/* Stats */}
        <View style={styles.stats}>
          <Text>Posts: {user.stats.posts} </Text>
          <Text>Followers: {user.stats.followers} </Text>
          <Text>Following: {user.stats.following}</Text>
        </View>
        
        {/* Follow Button */}
        <TouchableOpacity onPress={onFollow} style={styles.followButton}>
          <Text style={styles.followButtonText}>
            {user.isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Posts Section */}
      <Text style={styles.postsTitle}>Posts:</Text>
      <FlatList
        data={posts || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem post={item} onLike={onPostLike} />
        )}
      />
    </View>
  );
};

// Pure Post Item Component
interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      {post.author.avatar && (
        <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
      )}
      <Text style={styles.authorName}>{post.author.name}</Text>
      <Text style={styles.publishedAt}>
        {new Date(post.publishedAt).toLocaleDateString()}
      </Text>
    </View>
    
    <Text style={styles.postContent}>{post.content}</Text>
    
    <TouchableOpacity onPress={() => onLike(post.id)} style={styles.likeButton}>
      <Text style={[
        styles.likeText, 
        post.engagement.isLiked && styles.likedText
      ]}>
        ❤️ {post.engagement.likes} 💬 {post.engagement.comments}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  userInfo: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  displayName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  email: { fontSize: 16, color: '#666', marginBottom: 10 },
  stats: { flexDirection: 'row', marginBottom: 15 },
  followButton: { 
    backgroundColor: '#007AFF', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8 
  },
  followButtonText: { color: 'white', fontWeight: 'bold' },
  postsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  postContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  authorAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  authorName: { fontWeight: 'bold', flex: 1 },
  publishedAt: { color: '#666', fontSize: 12 },
  postContent: { marginBottom: 10, lineHeight: 20 },
  likeButton: { alignSelf: 'flex-start' },
  likeText: { color: '#666' },
  likedText: { color: '#ff4444' },
});
```

**Key Point**: UI components are pure - they only render props and call callbacks with no business logic.

## Step 8: Create Container Components

Build thin orchestration layers that connect data and actions to UI:

```typescript
// Container that orchestrates UserProfile data and actions
const UserProfileContainer: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading: userLoading } = useUserProfile(userId);
  const { data: posts, isLoading: postsLoading } = useUserPosts(userId);
  const { followUser } = useUserActions(userId);
  const { likePost } = usePostActions(posts);
  
  return (
    <UserProfileView
      user={user}
      posts={posts}
      isLoading={userLoading || postsLoading}
      onFollow={followUser}
      onPostLike={likePost}
    />
  );
};
```

**Key Point**: Containers are thin - they just connect data queries and action hooks to UI components.

## Step 9: App Setup and Usage

Set up the app with TanStack Query provider:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <UserProfileContainer userId="123" />
      </View>
    </QueryClientProvider>
  );
};
```

## Testing Strategy

### Test Pure UI Components
```typescript
import { render, fireEvent } from '@testing-library/react-native';

test('UserProfileView displays user information correctly', () => {
  const mockUser: UserProfile = {
    id: '1',
    displayName: 'John Doe',
    email: 'john@example.com',
    stats: { posts: 42, followers: 100, following: 50 },
    isFollowing: false,
  };
  
  const onFollow = jest.fn();
  const onPostLike = jest.fn();
  
  const { getByText } = render(
    <UserProfileView 
      user={mockUser}
      posts={[]}
      isLoading={false}
      onFollow={onFollow}
      onPostLike={onPostLike}
    />
  );
  
  expect(getByText('John Doe')).toBeTruthy();
  expect(getByText('john@example.com')).toBeTruthy();
  expect(getByText('Followers: 100')).toBeTruthy();
  
  fireEvent.press(getByText('Follow'));
  expect(onFollow).toHaveBeenCalled();
});
```

### Test Business Logic
```typescript
test('UserActions.toggleFollow updates user correctly', () => {
  const user: UserProfile = {
    id: '1',
    displayName: 'John',
    isFollowing: false,
    stats: { followers: 100, posts: 0, following: 0 },
  };
  
  const result = UserActions.toggleFollow('1', user);
  
  expect(result.isFollowing).toBe(true);
  expect(result.stats.followers).toBe(101);
});
```

### Test Action Hooks
```typescript
import { renderHook, act } from '@testing-library/react-hooks';

test('useUserActions returns working followUser function', () => {
  // Mock the data hooks
  jest.mock('./hooks', () => ({
    useUserProfile: () => ({ data: mockUser }),
  }));
  
  const { result } = renderHook(() => useUserActions('1'));
  
  act(() => {
    result.current.followUser();
  });
  
  // Verify the collection was updated
  expect(userCollection.update).toHaveBeenCalled();
});
```

## Benefits of This Architecture

### For UI Developers
- **Simple Components**: Just render props and call callbacks
- **Easy Testing**: Mock props and verify rendering
- **No Data Concerns**: Don't need to understand APIs or business logic
- **Reusable**: Same component works with different data sources

### For Backend Developers  
- **Clear Requirements**: UI schemas define exactly what data is needed
- **Flexible APIs**: Can change API structure without affecting UI
- **Independent Work**: Can modify data layer without touching UI

### For the Team
- **Parallel Development**: UI and backend teams work independently
- **Clear Boundaries**: Each layer has well-defined responsibilities  
- **Easy Debugging**: Issues are isolated to specific layers
- **Maintainable**: Changes in one layer don't cascade to others

## Key Principles Summary

1. **UI Components are Pure**: Only render props and call callbacks
2. **Schemas Define Contracts**: TypeScript interfaces specify data requirements
3. **Mappers Handle Transformation**: Declarative JSON converts API data to UI data
4. **Action Hooks Contain Logic**: All business logic lives in reusable hooks
5. **Containers Orchestrate**: Thin components connect data and actions to UI
6. **Collections Manage State**: TanStack DB handles caching and optimistic updates

This architecture ensures that each team member can focus on their expertise while maintaining clean separation of concerns and excellent maintainability.