type PlaygroundComponent = {
  id?: string;
  name: string;
  description?: string;
  component: () => React.ReactNode;
  code: string;
  variations?: PlaygroundComponent[];
};

type PlaygroundCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  componentCount: number;
};