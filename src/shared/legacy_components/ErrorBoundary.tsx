/* eslint-disable react/state-in-constructor */
import {ErrorBoundaryProps, SplashScreen} from 'expo-router';
import React from 'react';

export class ErrorBoundary extends React.Component<
  {
    catch: React.ComponentType<ErrorBoundaryProps>;
    children: React.ReactNode;
  },
  {error?: Error}
> {
  state = {error: undefined};

  static getDerivedStateFromError(error: Error) {
    // Force hide the splash screen if an error occurs.
    SplashScreen.hideAsync();

    return {error};
  }

  retry = () => {
    return new Promise<void>((resolve) => {
      this.setState({error: undefined}, () => {
        resolve();
      });
    });
  };

  render() {
    const {error} = this.state;
    const {catch: ErrorBoundaryComponent, children} = this.props;
    if (!error) {
      return children;
    }
    return <ErrorBoundaryComponent error={error} retry={this.retry} />;
  }
}
