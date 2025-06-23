🛡️ Decentralized Identity Verification DApp
Revolutionizing user authentication, this secure and user-friendly Ethereum-based Decentralized Application (dApp) provides a robust solution for identity verification. Built with the powerful combination of Solidity for smart contracts, a React frontend, seamless MetaMask integration, and Ganache for local development, this dApp offers a glimpse into the future of self-sovereign identity.

🚀 Key Features
This dApp is designed to deliver a smooth and secure identity verification experience:

🧾 User Registration & Profile Management: Easily register new users, associating their unique username, a securely hashed ID, and a password hash with their Ethereum wallet.
🔐 Secure User Authentication: Authenticate users efficiently by comparing their input password hash with the one stored on the blockchain, ensuring secure access.
🔄 Multiple Identities per Wallet: Break free from the one-to-one wallet-to-user limitation. This dApp thoughtfully supports the registration of multiple user identities linked to a single MetaMask wallet, offering enhanced flexibility.
🔎 Flexible User Search: Quickly locate registered users by either their unique username or their associated wallet address, simplifying identity management.
🦊 Seamless MetaMask Integration: Experience intuitive, wallet-based interactions thanks to deep integration with MetaMask, providing a familiar and secure gateway to the blockchain.
🧪 Local Development & Testing: Develop and test with confidence using Ganache, a personal Ethereum blockchain, enabling rapid iteration and debugging in a controlled environment.
🧰 Tech Stack Deep Dive
Our dApp leverages a modern and robust tech stack to deliver its decentralized capabilities:

Layer	Technology	Purpose
💻 Smart Contract	Solidity, Hardhat	Defines the core logic for user registration, authentication, and data storage on the Ethereum blockchain. Hardhat provides a powerful development environment.
🌐 Frontend	React, Ethers.js, MetaMask	Powers the interactive and responsive user interface. Ethers.js facilitates seamless interaction with the Ethereum blockchain, while MetaMask handles wallet connectivity.
🔗 Blockchain	Ganache (Local Ethereum Network)	Provides a personal, configurable Ethereum blockchain for rapid local development, testing, and debugging without real network fees.
🧠 Hashing	crypto-js (SHA256 for ID & password)	Ensures the cryptographic security of user IDs and passwords by generating irreversible SHA256 hashes before storing them on-chain.

Export to Sheets
📁 Project Structure
The project is thoughtfully organized for clarity and ease of development:

decentralized-id-verification/
│
├── new-backend/              # Smart contract development & deployment
│   ├── contracts/            # Core Solidity contract for identity management
│   │   └── IdentityVerification.sol
│   ├── scripts/              # Hardhat scripts for deployment and interaction
│   │   ├── deploy.js         # Script to deploy the IdentityVerification contract
│   │   └── interact.js       # Example script for contract interaction (can be expanded)
│   ├── test/                 # Comprehensive unit tests for the smart contract
│   │   └── IdentityVerification.test.js
│   └── hardhat.config.js     # Hardhat configuration for network settings and compilers
│
├── frontend/                 # React-based user interface
│   ├── public/               # Public assets for the React application
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable React components
│   │   │   └── Auth.js       # Handles user registration and login forms
│   │   ├── App.js            # Main application component
│   │   ├── index.js          # Entry point of the React application
│   │   └── web3.js           # (Optional but recommended) Utility file for Web3/Ethers.js initialization
│   └── package.json          # Frontend dependencies and scripts
│
└── README.md                 # Project overview and instructions
🔧 Getting Started: Setup Instructions
Follow these simple steps to get your Decentralized Identity Verification dApp up and running on your local machine:

1. 📦 Install Dependencies
Navigate to both the new-backend and frontend directories and install their respective dependencies:

cd new-backend
npm install # Installs Hardhat, Ethers.js, and other backend dependencies
cd ../frontend
npm install # Installs React, Ethers.js, crypto-js, and other frontend dependencies
2. ⚙️ Start Ganache
Ganache will simulate a local Ethereum blockchain for development purposes:

Download & Run Ganache: If you haven't already, download and install Ganache from the official Truffle Suite website. Launch the application.
Configure Local Blockchain: Ensure Ganache is running on http://127.0.0.1:7545. This is your local Ethereum network endpoint.
Note Private Key: Keep a private key from one of the Ganache-generated accounts handy. You'll need this to import an account into MetaMask for testing.
3. 🚀 Deploy Smart Contract
Deploy your IdentityVerification.sol smart contract to your local Ganache network:

cd new-backend
npx hardhat run scripts/deploy.js --network localhost
Important: After successful deployment, the console will output the deployed contract's address. You'll need to update this address in your frontend code (e.g., in a configuration file or directly in Auth.js) so your frontend can interact with the correct contract instance.
4. 🧠 Connect MetaMask
Configure MetaMask to connect to your local Ganache network:

Open MetaMask: Access the MetaMask extension in your web browser.
Add Custom Network: Click on the network dropdown (usually "Ethereum Mainnet") and select "Add Network" -> "Add a network manually".
Enter Network Details:
Network name: Ganache (or any name you prefer)
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337 or 5777 (Verify this in your Ganache UI, typically shown as "NETWORK ID" or "CHAIN ID").
Currency symbol (optional): ETH
Import Account: Once the network is added, select "Import account" and paste the private key you noted from Ganache in Step 2. This will allow MetaMask to control an account on your local blockchain.
5. 🖥️ Run React Frontend
Launch the React development server to interact with your dApp:

cd frontend
npm start
Open your web browser and navigate to http://localhost:3000. You should now see the Decentralized Identity Verification dApp user interface!
🔐 How It Works: Under the Hood
🧾 Registration Process
When a user registers:

They provide a username, their unique ID, and a chosen password.
Crucially, both the ID and password are immediately hashed using SHA256 client-side (via crypto-js). This means only the non-reversible hash is ever transmitted to or stored on the blockchain, protecting sensitive information.
The IdentityVerification smart contract then securely records this hashed data along with the user's connected MetaMask wallet address.
🔍 Verification (Login) Process
When a user attempts to log in:

They input their registered username and password.
Similar to registration, the input password is hashed client-side using SHA256.
This newly generated hash is then sent to the smart contract, which compares it against the stored passwordHash associated with the provided username and wallet address.
If the hashes match, the smart contract confirms the user's identity, and the frontend authenticates the user, redirecting them to a dashboard or a success page. This entire process ensures that plain-text passwords are never exposed.

Solidity
struct User {
    string username;       // Unique identifier for the user
    string idHash;         // SHA256 hash of the user's actual ID (e.g., Aadhaar, passport number)
    string passwordHash;   // SHA256 hash of the user's chosen password
    address wallet;        // The user's associated Ethereum wallet address
}
Key aspects of the contract:

✅ Data Privacy by Design: Only hashed data (ID and password) is stored on the public blockchain, significantly enhancing user privacy and security.
🔐 Secure Authentication Logic: The contract includes functions to verify a user's identity by comparing hashed passwords, ensuring that authentication is robust and tamper-proof.
🧾 Multi-Identity Support: The design allows for a single Ethereum wallet address to register and manage multiple distinct usernames/identities, providing flexibility for users who may need different personas or accounts.
📢 Smart Contract Events
The IdentityVerification contract emits events to provide transparent and easily trackable information about key actions:

Solidity

event UserRegistered(address indexed userAddress, string username);
// Emitted when a new user successfully registers, indicating the wallet address and username.
These events are crucial for off-chain applications (like your React frontend) to listen for and react to changes on the blockchain, enabling a dynamic user experience.

🤝 Acknowledgements
This project was made possible by leveraging these incredible open-source tools and platforms:

Hardhat: An Ethereum development environment for professionals, providing powerful tools for testing, compiling, and deploying smart contracts.
MetaMask: The leading browser extension for interacting with the Ethereum blockchain and decentralized applications.
Ganache: A personal blockchain for Ethereum development, allowing you to deploy dApps, develop, and test them in a safe and deterministic environment.
CryptoJS: A collection of cryptographic algorithms implemented in JavaScript, used here for secure SHA256 hashing.

---
## 📄 License

MIT © [Vishwanath Biradar](https://github.com/vishwanath090)
