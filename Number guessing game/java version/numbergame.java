import java.util.Random;
import java.util.Scanner;

public class Numbergame {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        int maxNumber = 100;
        int difficulty;

        System.out.println("=================================");
        System.out.println("      🎯 NUMBER GUESSING GAME");
        System.out.println("=================================");

        System.out.println("\nDifficulty:");
        System.out.println("1. Easy   → 1-50");
        System.out.println("2. Medium → 1-100");
        System.out.println("3. Hard   → 1-1000");

        System.out.print("\nEnter your choice: ");
        difficulty = scanner.nextInt();

        // Set the range according to difficulty
        switch (difficulty) {
            case 1:
                maxNumber = 50;
                System.out.println("\nEasy Mode selected!");
                break;

            case 2:
                maxNumber = 100;
                System.out.println("\nMedium Mode selected!");
                break;

            case 3:
                maxNumber = 1000;
                System.out.println("\nHard Mode selected!");
                break;

            default:
                System.out.println("\nInvalid choice!");
                System.out.println("Starting Medium Mode by default.");
                maxNumber = 100;
        }

        // Generate random number
        int numberToGuess = random.nextInt(maxNumber) + 1;

        int userGuess;
        int attempts = 0;

        System.out.println("\nI have selected a number between 1 and " + maxNumber + ".");
        System.out.println("Try to guess the number!");

        do {

            System.out.print("\nEnter your guess: ");
            userGuess = scanner.nextInt();

            // Check if guess is within range
            if (userGuess < 1 || userGuess > maxNumber) {
                System.out.println("⚠️ Please enter a number between 1 and " + maxNumber + ".");
                continue;
            }

            attempts++;

            if (userGuess > numberToGuess) {
                System.out.println("Too High! Try a smaller number.");
            }
            else if (userGuess < numberToGuess) {
                System.out.println("Too Low! Try a larger number.");
            }
            else {
                System.out.println("\n🎉 Correct! Congratulations!");
                System.out.println("You guessed the number in "
                        + attempts + " attempts.");
            }

        } while (userGuess != numberToGuess);

        System.out.println("\n=================================");
        System.out.println("        GAME OVER 🎯");
        System.out.println("=================================");

        scanner.close();
    }
}