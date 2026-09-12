import java.util.Scanner;

public class CurrencyConverter {

    // Exchange rates based on 1 USD
    static double getRate(String currency) {

        switch (currency) {
            case "USD":
                return 1.0;

            case "INR":
                return 83.0;

            case "EUR":
                return 0.92;

            case "GBP":
                return 0.79;

            case "JPY":
                return 149.0;

            case "AUD":
                return 1.53;

            default:
                return 0;
        }
    }

    // Currency conversion method
    static double convertCurrency(
            double amount,
            String fromCurrency,
            String toCurrency) {

        double fromRate = getRate(fromCurrency);
        double toRate = getRate(toCurrency);

        // Convert source currency to USD first
        double amountInUSD = amount / fromRate;

        // Convert USD to target currency
        return amountInUSD * toRate;
    }

    static void displayCurrencies() {

        System.out.println("\nAvailable Currencies:");
        System.out.println("1. USD - US Dollar");
        System.out.println("2. INR - Indian Rupee");
        System.out.println("3. EUR - Euro");
        System.out.println("4. GBP - British Pound");
        System.out.println("5. JPY - Japanese Yen");
        System.out.println("6. AUD - Australian Dollar");
    }

    static String getCurrencyCode(int choice) {

        switch (choice) {

            case 1:
                return "USD";

            case 2:
                return "INR";

            case 3:
                return "EUR";

            case 4:
                return "GBP";

            case 5:
                return "JPY";

            case 6:
                return "AUD";

            default:
                return "";
        }
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("======================================");
        System.out.println("          CURRENCY CONVERTER");
        System.out.println("======================================");

        displayCurrencies();

        System.out.print("\nSelect base currency (1-6): ");
        int fromChoice = scanner.nextInt();

        System.out.print("Select target currency (1-6): ");
        int toChoice = scanner.nextInt();

        if (fromChoice < 1 || fromChoice > 6 ||
            toChoice < 1 || toChoice > 6) {

            System.out.println("\nInvalid currency selection.");
            scanner.close();
            return;
        }

        String fromCurrency = getCurrencyCode(fromChoice);
        String toCurrency = getCurrencyCode(toChoice);

        System.out.print(
            "Enter amount in " + fromCurrency + ": "
        );

        double amount = scanner.nextDouble();

        if (amount <= 0) {

            System.out.println(
                "Invalid amount. Please enter a value greater than 0."
            );

            scanner.close();
            return;
        }

        double convertedAmount =
            convertCurrency(
                amount,
                fromCurrency,
                toCurrency
            );

        System.out.println("\n======================================");
        System.out.println("              RESULT");
        System.out.println("======================================");

        System.out.printf(
            "%.2f %s = %.2f %s%n",
            amount,
            fromCurrency,
            convertedAmount,
            toCurrency
        );

        System.out.println("======================================");

        scanner.close();
    }
}