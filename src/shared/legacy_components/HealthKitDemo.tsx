import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useHealthKit} from '../health/hooks/useHealthKit';

export const HealthKitDemo: React.FC = () => {
  const {isAvailable, isAuthorized, isLoading, error, todayData, refreshData} =
    useHealthKit();

  // Hide UI if not on iOS
  if (Platform.OS !== 'ios') {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading HealthKit...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={refreshData}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          HealthKit is not available on this device
        </Text>
      </View>
    );
  }

  if (!isAuthorized) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Please authorize HealthKit access in Settings
        </Text>
        <TouchableOpacity style={styles.button} onPress={refreshData}>
          <Text style={styles.buttonText}>Request Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HealthKit Data</Text>

      {todayData && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Data</Text>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Steps:</Text>
            <Text style={styles.value}>{todayData.steps.toLocaleString()}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Calories:</Text>
            <Text style={styles.value}>{Math.round(todayData.calories)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Heart Rate:</Text>
            <Text style={styles.value}>{todayData.heartRate} BPM</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Distance:</Text>
            <Text style={styles.value}>
              {(todayData.distance / 1000).toFixed(2)} km
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Flights Climbed:</Text>
            <Text style={styles.value}>{todayData.flightsClimbed}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={refreshData}>
        <Text style={styles.buttonText}>Refresh Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#e74c3c',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 40,
  },
  weekData: {
    alignItems: 'center',
    flex: 1,
  },
  weekValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  weekLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
