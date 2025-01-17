# MyNFT Project

## Overview

The **MyNFT** project is a comprehensive application that integrates multiple components including a backend server, an Expo-based mobile app, a machine learning model, and smart contracts for managing NFTs. This project combines various technologies to provide a robust and scalable solution.

## Project Structure

- **Backend:** Contains the server code, typically using Node.js and Express, which handles API requests, interacts with the database, and manages business logic.
- **ExpoApp:** An Expo-based React Native application that interacts with the backend and displays data to users.
- **mlModel:** Directory for machine learning models used in the application, which may include training scripts and pre-trained models.
- **SmartContracts:** Contains the Solidity smart contracts used for minting and managing NFTs on the blockchain.

## Installation

### Backend

1. Navigate to the `Backend` directory.
2. Install the dependencies:
   ```bash
   cd Backend
   npm install
   ```

### ExpoApp

1. Navigate to the `ExpoApp` directory.
2. Install the dependencies:
   ```bash
   cd ExpoApp
   npm install
   ```

### Machine Learning Model

1. Navigate to the `mlModel` directory.
2. Install required packages (e.g., Python dependencies):
   ```bash
   pip install -r requirements.txt
   ```

### Smart Contracts

1. Navigate to the `SmartContracts` directory.
2. Install the required tools and dependencies:
   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables:**
   Create a `.env` file in the root directory of the `Backend` and `ExpoApp` with the necessary environment variables. Example:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

2. **Smart Contracts:**
   Update configuration files if needed for deployment or connection with the blockchain network.

## Usage

### Starting the Backend

1. Navigate to the `Backend` directory.
2. Start the server:
   ```bash
   npm start
   ```

### Running the Expo App

1. Navigate to the `ExpoApp` directory.
2. Start the Expo app:
   ```bash
   npm start
   ```

### Machine Learning Model

1. Navigate to the `mlModel` directory.
2. Run the necessary scripts to train or use the model.

### Deploying Smart Contracts

1. Navigate to the `SmartContracts` directory.
2. Deploy the contracts to the blockchain:
   ```bash
   npx hardhat run scripts/deploy.js
   ```

## Testing

- **Backend:** Run tests in the `Backend` directory using:
  ```bash
  npm test
  ```

- **Expo App:** Run tests in the `ExpoApp` directory using:
  ```bash
  npm test
  ```

- **Machine Learning Model:** Test model scripts in the `mlModel` directory.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out to [your email](jsbaruha1@gmail.com).
