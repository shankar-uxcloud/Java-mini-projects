import java.util.Scanner;

public class ATMInterface {

    static double balance = 5000.00;

    // Method to check balance
    public static void checkBalance() {
        System.out.printf("Current Balance: Rs. %.2f%n", balance);
    }

    // Method to deposit money
    public static void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid deposit amount.");
            return;
        }

        balance += amount;

        System.out.printf("Rs. %.2f deposited successfully.%n", amount);
        System.out.printf("New Balance: Rs. %.2f%n", balance);
    }

    // Method to withdraw money
    public static void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid withdrawal amount.");
            return;
        }

        if (amount > balance) {
            System.out.println("Insufficient balance.");
            return;
        }

        balance -= amount;

        System.out.printf("Rs. %.2f withdrawn successfully.%n", amount);
        System.out.printf("Remaining Balance: Rs. %.2f%n", balance);
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println();
            System.out.println("================================");
            System.out.println("          ATM INTERFACE");
            System.out.println("================================");
            System.out.println("1. Check Balance");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Exit");
            System.out.println("================================");

            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice) {

                case 1:
                    checkBalance();
                    break;

                case 2:
                    System.out.print("Enter deposit amount: Rs. ");
                    double depositAmount = scanner.nextDouble();
                    deposit(depositAmount);
                    break;

                case 3:
                    System.out.print("Enter withdrawal amount: Rs. ");
                    double withdrawAmount = scanner.nextDouble();
                    withdraw(withdrawAmount);
                    break;

                case 4:
                    System.out.println("Thank you for using the ATM!");
                    break;

                default:
                    System.out.println("Invalid choice. Please select 1-4.");
            }

        } while (choice != 4);

        scanner.close();
    }
}