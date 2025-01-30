# Expo Camera Preview Blank - Asynchronous Initialization Issue

This repository demonstrates a common error when using the Expo Camera API: accessing the camera preview before it's fully initialized. The `bug.js` file shows the problematic code, while `bugSolution.js` provides the corrected version.  The issue arises from attempting to use camera features before the asynchronous setup process is complete.

## Problem
The problem lies in directly using the camera object's properties or methods (like taking a picture) within the component's `useEffect` hook, neglecting the time it takes for the camera to initialize. This usually leads to a blank preview or errors related to an unavailable camera.

## Solution
The solution involves using the camera's `status` property to ensure the camera is ready before accessing its functionality. We can use an asynchronous function to wait for the camera to be ready (`CAMERA_STATUS.READY`) before proceeding.