// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract IdentityVerification {
    struct User {
        string username;
        string idHash;
        string passwordHash;
        address wallet;
    }

    mapping(string => User) private _users; // Username => User struct
    mapping(address => string[]) private _walletToUsernames; // Wallet => Usernames

    event UserRegistered(address indexed userAddress, string username);

    function registerUser(
        string calldata _username,
        string calldata _idHash,
        string calldata _passwordHash
    ) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_idHash).length == 64, "Invalid ID hash length");
        require(bytes(_passwordHash).length == 64, "Invalid password hash length");
        require(_users[_username].wallet == address(0), "Username already taken");

        _users[_username] = User({
            username: _username,
            idHash: _idHash,
            passwordHash: _passwordHash,
            wallet: msg.sender
        });

        _walletToUsernames[msg.sender].push(_username);
        emit UserRegistered(msg.sender, _username);
    }

    function verifyUser(
        string calldata _username,
        string calldata _passwordHash
    ) external view returns (bool) {
        User storage user = _users[_username];
        require(user.wallet != address(0), "User not found");
        return keccak256(bytes(user.passwordHash)) == keccak256(bytes(_passwordHash));
    }

    function getUserByUsername(string calldata _username) external view returns (User memory) {
        require(_users[_username].wallet != address(0), "User not found");
        return _users[_username];
    }

    function getUsernamesByWallet(address _wallet) external view returns (string[] memory) {
        return _walletToUsernames[_wallet];
    }

    function getAddressByUsername(string calldata _username) external view returns (address) {
        return _users[_username].wallet;
    }
}
