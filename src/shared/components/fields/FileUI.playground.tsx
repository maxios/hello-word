/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { FileUI } from "./FileUI";

export const components: PlaygroundComponent[] = [
  {
    id: "file-ui-basic",
    name: "Basic FileUI",
    description: "File upload component for selecting images and documents",
    component: () => {
      const [value, setValue] = useState(null);
      return (
        <FileUI value={value} onChange={setValue} label="Profile Picture" />
      );
    },
    code: `const [value, setValue] = useState(null);

<FileUI
  value={value}
  onChange={setValue}
  label="Profile Picture"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState(null);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Document Upload"
              required
              helperText="Please upload a required document"
            />
          );
        },
        code: `<FileUI
  value={value}
  onChange={setValue}
  label="Document Upload"
  required
  helperText="Please upload a required document"
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState(null);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="ID Verification"
              error="File size must be less than 5MB"
            />
          );
        },
        code: `<FileUI
  value={value}
  onChange={setValue}
  label="ID Verification"
  error="File size must be less than 5MB"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState(null);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Resume Upload"
              helperText="Accepted formats: PDF, DOC, DOCX (max 10MB)"
            />
          );
        },
        code: `<FileUI
  value={value}
  onChange={setValue}
  label="Resume Upload"
  helperText="Accepted formats: PDF, DOC, DOCX (max 10MB)"
/>`,
      },
      {
        name: "Multiple Files",
        component: () => {
          const [value, setValue] = useState(null);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Gallery Photos"
              multiple
              helperText="Select multiple photos for your gallery"
            />
          );
        },
        code: `<FileUI
  value={value}
  onChange={setValue}
  label="Gallery Photos"
  multiple
  helperText="Select multiple photos for your gallery"
/>`,
      },
      {
        name: "Avatar Upload",
        component: () => {
          const [value, setValue] = useState(null);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Profile Avatar"
              helperText="Upload a square image for best results"
            />
          );
        },
        code: `<FileUI
  value={value}
  onChange={setValue}
  label="Profile Avatar"
  helperText="Upload a square image for best results"
/>`,
      },
      {
        name: "Product Images",
        component: () => {
          const [value, setValue] = useState(null);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Product Photos"
              multiple
              helperText="Upload high-quality product images (max 5 images)"
            />
          );
        },
        code: `<FileUI
  value={value}
  onChange={setValue}
  label="Product Photos"
  multiple
  helperText="Upload high-quality product images (max 5 images)"
/>`,
      },
      {
        name: "With File Selection Callback",
        component: () => {
          const [value, setValue] = useState(null);
          const handleFileSelect = (files: any[]) => {
            console.log("Files selected:", files);
          };
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Attachment"
              onFileSelect={handleFileSelect}
              helperText="File selection triggers additional processing"
            />
          );
        },
        code: `const handleFileSelect = (files: any[]) => {
  console.log("Files selected:", files);
};

<FileUI
  value={value}
  onChange={setValue}
  label="Attachment"
  onFileSelect={handleFileSelect}
  helperText="File selection triggers additional processing"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <FileUI
              value={null}
              onChange={() => {}}
              label="Locked Upload"
              disabled
              helperText="File upload is currently disabled"
            />
          );
        },
        code: `<FileUI
  value={null}
  onChange={() => {}}
  label="Locked Upload"
  disabled
  helperText="File upload is currently disabled"
/>`,
      },
      {
        name: "With Selected File",
        component: () => {
          const [value, setValue] = useState({
            uri: "https://via.placeholder.com/150",
            fileName: "example-image.jpg",
          });
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Current Image"
              helperText="Click to replace the current image"
            />
          );
        },
        code: `const [value, setValue] = useState({
  uri: "https://via.placeholder.com/150",
  fileName: "example-image.jpg",
});

<FileUI
  value={value}
  onChange={setValue}
  label="Current Image"
  helperText="Click to replace the current image"
/>`,
      },
      {
        name: "Multiple Selected Files",
        component: () => {
          const [value, setValue] = useState([
            {
              uri: "https://via.placeholder.com/150/FF0000",
              fileName: "image1.jpg",
            },
            {
              uri: "https://via.placeholder.com/150/00FF00",
              fileName: "image2.jpg",
            },
          ]);
          return (
            <FileUI
              value={value}
              onChange={setValue}
              label="Portfolio Images"
              multiple
              helperText="Add more images to your portfolio"
            />
          );
        },
        code: `const [value, setValue] = useState([
  {
    uri: "https://via.placeholder.com/150/FF0000",
    fileName: "image1.jpg",
  },
  {
    uri: "https://via.placeholder.com/150/00FF00",
    fileName: "image2.jpg",
  },
]);

<FileUI
  value={value}
  onChange={setValue}
  label="Portfolio Images"
  multiple
  helperText="Add more images to your portfolio"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `FileUI provides an intuitive file upload interface using the device's image picker.
It supports both single and multiple file selection, shows preview thumbnails for selected images,
and provides clear actions for adding or removing files. Perfect for profile pictures, document uploads, and gallery creation.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Clearly specify accepted file types in helper text",
    "Include file size limits and format requirements",
    "Show preview thumbnails for uploaded images",
    "Provide clear remove/delete functionality",
    "Use appropriate labels that describe the file purpose",
    "Handle upload errors gracefully with clear messaging",
    "Consider compression for large image files",
    "Implement proper file validation on both client and server",
    "Show upload progress for larger files",
    "Provide alternative text input for accessibility",
  ],
};

export const meta = {
  id: "file-ui",
  name: "FileUI",
  icon: "📁",
  description:
    "File upload component with image picker and preview functionality",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
