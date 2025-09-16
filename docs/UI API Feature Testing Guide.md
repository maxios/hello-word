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
