# CREATED FOR ETHGLOBAL BANGKOK 2024

## Gas Sponsorship Subscription Platform

### Project Overview
We are building a **Gas Sponsorship Subscription Platform** for the EthGlobal Bangkok Hackathon. This platform enables users to purchase a gas-sponsorship subscription (potentially as an NFT) across any blockchain they choose. By holding an active subscription, users can execute gas-free transactions across multiple chains for a designated time period (e.g., 1 month, 3 months). The platform is designed to streamline gas fee management and allow users greater flexibility in interacting with decentralized applications across multiple blockchains.

---

## Key Features
1. **Cross-Chain Subscription**: Users can purchase a subscription on any chain and leverage it to cover gas costs on different chains.
2. **Smart Wallet Requirement**: Users are required to use a smart wallet to purchase subscriptions. In future iterations, the platform will offer a feature for users to create smart wallets directly if they don’t already have one.
3. **Custom Bundler and Paymaster**: A custom bundler will verify users' subscriptions off-chain, allowing our paymaster to cover gas fees on transactions.
4. **Cross-Chain Message Relaying**: Cross-chain communication (via LayerZero's OApp protocol) ensures subscription data synchronization across chains in real-time.

---

## Workflow & Scenarios

The platform workflow involves two primary cases based on the chain where the user purchases the subscription and the chain where they initiate the transaction. Each scenario outlines the specific sequence of steps, including interactions between the bundler, paymaster, and cross-chain messaging protocols.

### Scenario 1: Cross-Chain Transaction (Subscription on Chain A, Transaction on Chain B)
In this scenario, the user purchases a gas subscription on **Chain A** and subsequently initiates a transaction on **Chain B**.

#### Step-by-Step Flow

1. **User Buys Subscription**:
    - The user purchases a gas-sponsorship subscription on Chain A. This subscription contract contains the user's active subscription status and expiration period.

2. **User Initiates Transaction on Chain B**:
    - The user prepares to perform a transaction on Chain B, with their gas fee expected to be covered by their active subscription.

3. **Customized Bundler Verification** or **LzRead functionality**:
    - The customized bundler intercepts the transaction on Chain B and performs an **off-chain verification** by:
        - Checking the user's subscription status on Chain A.
        - Verifying that the subscription is active and includes the specified time period for which the user has paid.
    - This off-chain check ensures the integrity of the subscription data, preventing reliance on external bundlers for accurate information.
    - Another way to read the other chain's data is using LzRead functionality as part of OApp protocol in LayerZero.

4. **Database Update to Prevent Race Conditions**:
    - The bundler updates its local off-chain database with pending transaction details, ensuring race conditions are prevented even if the transaction is not finalized yet.

5. **Paymaster's Pre-Op Function**:
    - In the pre-operation (pre-op) phase, the paymaster verifies that:
        - The transaction originates from our **customized bundler** (ensuring authenticity).
    - If it does not, the subscription must be on the same chain. [See Scenario 2](#scenario-2-same-chain-transaction-subscription-and-transaction-on-chain-a).
    - If the checks pass, the paymaster proceeds to pay the gas fee on the user’s behalf.

6. **Cross-Chain Messaging for Subscription Update**:
    - After the transaction completes, the paymaster’s **post-operation (post-op) function** triggers a cross-chain message using the **LayerZero OApp protocol** to synchronize the user's subscription status.
    - This ensures that Chain A recognizes the gas usage on Chain B, deducting the appropriate amount from the user's subscription balance or duration.

#### Summary
In this scenario, the customized bundler plays a critical role in verifying the user's cross-chain subscription status off-chain, and the paymaster ensures the transaction gas is sponsored by verifying the bundler’s legitimacy and the subscription data.

### Scenario 2: Same-Chain Transaction (Subscription and Transaction on Chain A)
In this case, the user purchases a gas-sponsorship subscription and initiates a transaction on **the same chain (Chain A)**.

#### Step-by-Step Flow

1. **User Buys Subscription**:
    - The user purchases a gas-sponsorship subscription on Chain A, activating their ability to perform gas-free transactions on Chain A.

2. **User Initiates Transaction on Chain A**:
    - The user initiates a transaction on Chain A, intending to use their subscription benefits to cover the gas costs.

3. **Bundler Verification**:
    - Any bundler can be used in this case, as the transaction and subscription reside on the same chain.
    - The bundler checks the **paymaster data** embedded in the user operation (UserOp) and submits the transaction for processing.

4. **Paymaster's Pre-Op Function**:
    - In the pre-op phase, the paymaster verifies that the user has an active subscription on Chain A. If the subscription is valid, the paymaster pays the gas fee.

5. **Subscription Update**:
    - In the post-op phase, the paymaster updates the subscription balance or expiration based on the gas usage incurred by the transaction.

#### Summary
In this same-chain scenario, the process is more straightforward. The bundler and paymaster directly interact with the subscription data on Chain A, eliminating the need for cross-chain verification or messaging.

---

## Technical Components

1. **Custom Bundler**:
    - Handles cross-chain subscription verification by managing an off-chain database.
    - Responsible for querying and updating user subscription data to ensure accurate gas sponsorship.
    - Designed to prevent race conditions by preemptively tracking pending transactions.

2. **Paymaster Contract**:
    - Ensures the subscription is verified in the **pre-op function** and then pays the gas fees if requirements are met.
    - Updates the user's subscription details in the **post-op function** using cross-chain messaging when necessary.
    - Communicates with LayerZero's OApp protocol to update the subscription.

3. **LayerZero OApp Protocol**:
    - Facilitates secure and efficient cross-chain messaging.
    - Allows paymaster updates on user subscriptions, reflecting gas usage on the original chain of subscription purchase.
    - Enables cross-chain compatibility, making the platform versatile and highly scalable.

---

## Future Enhancements

- **Smart Wallet Integration**:
    - The platform will provide an integrated smart wallet creation feature, ensuring users without existing wallets can participate.

- **Flexible Subscription Models**:
    - Introduce varied subscription plans with different gas limits, renewal options, and time durations.

- **Advanced Cross-Chain Data Management**:
    - Explore advanced indexing solutions for quicker and more efficient cross-chain data verification and bundler updates.

---

## Conclusion
This Gas Sponsorship Subscription Platform provides a unique, flexible solution for gas fee management, supporting users across multiple blockchains. By leveraging a custom bundler and paymaster with LayerZero’s cross-chain messaging, the platform delivers secure and seamless cross-chain transactions while offering users a gas-free experience within their subscription limits.
