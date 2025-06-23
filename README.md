# 🛡️ Decentralized Identity Verification DApp

A secure and user-friendly **Ethereum-based dApp** for identity verification, built using **💻Solidity**, **⚛️React**, **🦊MetaMask**, and **Ganache**.

Revolutionizing user authentication, this secure and user-friendly Ethereum-based Decentralized Application (dApp) provides a robust solution for identity verification. Built with the powerful combination of Solidity for smart contracts, a React frontend, seamless MetaMask integration, and Ganache for local development, this dApp offers a glimpse into the future of self-sovereign identity.
---

## 🚀 Features

- 🧾 Register users with username, ID hash, and password hash
- 🔐 Authenticate users using password hash comparison
- 🔄 Supports multiple user registrations per wallet
- 🔎 Search users by username or wallet address
- 🦊 MetaMask integration for wallet-based interaction
- 🧪 Locally testable using Ganache

---

## 🧰 Tech Stack

| Layer           | Technology                             |
|-----------------|----------------------------------------|
| 💻 Smart Contract | Solidity, Hardhat                    |
| 🌐 Frontend      | React, Ethers.js, MetaMask            |
| 🔗 Blockchain    | Ganache (Local Ethereum network)       |
| 🧠 Hashing       | crypto-js (SHA256 for ID & password)   |

---

## 📁 Project Structure

```
decentralized-id-verification/
│
├── new-backend/                  # Smart contract & scripts
│   ├── contracts/                # Solidity contract
│   ├── scripts/                  # deploy.js & interact.js
│   ├── test/                     # Unit tests
│   └── hardhat.config.js         # Hardhat setup
│
├── frontend/                      # React frontend
│   ├── src/components/Auth.jsx    # Registration/Login form
│   └── ...
│
└── README.md
```

---

## 🔧 Setup Instructions

### 1. 📦 Install Dependencies

```
cd new-backend
npm install
cd ../frontend
npm install
```

---

### 2. ⚙️ Start Ganache

- Download & run [Ganache](https://trufflesuite.com/ganache/)
- Use `http://127.0.0.1:7545` as your local blockchain
- Note the private key and import it into MetaMask

---

### 3. 🚀 Deploy Smart Contract

```
cd new-backend
npx hardhat run scripts/deploy.js --network localhost
```

---

### 4. 🧠 Connect MetaMask

- Open MetaMask in browser
- Add a custom network:
  - **Network name**: Ganache
  - **RPC URL**: `http://127.0.0.1:7545`
  - **Chain ID**: `1337` or `5777` (check Ganache)
- Import account from Ganache using private key

---

### 5. 🖥️ Run React Frontend

```
cd frontend
npm start
```

> Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 How It Works

### 🧾 Register
- Users input a `username`, `ID`, and `password`
- ID & password are **hashed (SHA256)** before storing on-chain
- The smart contract stores this with the user’s MetaMask address

### 🔍 Verify
- On login, the input password is hashed and checked on-chain
- If valid, the user is authenticated and redirected to the dashboard

---

## 📸 Screenshots

> 📷 *Add screenshots of your login/registration UI here*

---

## 🛠 Smart Contract: `IdentityVerification.sol`

```solidity
struct User {
  string username;
  string idHash;
  string passwordHash;
  address wallet;
}
```

✅ Stores hashed data for privacy  
🔐 Verifies user by checking hashed password  
🧾 Supports multiple usernames per wallet address  

---

## 📢 Events

```solidity
event UserRegistered(address indexed userAddress, string username);
```

---


## 🤝 Acknowledgements

- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/)
- [Ganache](https://trufflesuite.com/ganache/)
- [CryptoJS](https://www.npmjs.com/package/crypto-js)

---

## 📄 License

MIT © [Vishwanath Biradar](https://github.com/vishwanath090)
