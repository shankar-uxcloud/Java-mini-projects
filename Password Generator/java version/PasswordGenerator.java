import java.util.Scanner;
import java.util.Random;

public class PasswordGenerator {

    static final String UPPERCASE =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    static final String LOWERCASE =
            "abcdefghijklmnopqrstuvwxyz";

    static final String NUMBERS =
            "0123456789";

    static final String SPECIAL_CHARACTERS =
            "!@#$%^&*()-_=+[]{}";

    static final String ALL_CHARACTERS =
            UPPERCASE + LOWERCASE + NUMBERS + SPECIAL_CHARACTERS;


    // Generate password
    public static String generatePassword(int length) {

        Random random = new Random();

        StringBuilder password = new StringBuilder();

        // At least one uppercase character
        password.append(
                UPPERCASE.charAt(
                        random.nextInt(UPPERCASE.length())
                )
        );

        // At least one lowercase character
        password.append(
                LOWERCASE.charAt(
                        random.nextInt(LOWERCASE.length())
                )
        );

        // At least one number
        password.append(
                NUMBERS.charAt(
                        random.nextInt(NUMBERS.length())
                )
        );

        // At least one special character
        password.append(
                SPECIAL_CHARACTERS.charAt(
                        random.nextInt(SPECIAL_CHARACTERS.length())
                )
        );


        // Generate remaining characters
        for (int i = 4; i < length; i++) {

            password.append(
                    ALL_CHARACTERS.charAt(
                            random.nextInt(
                                    ALL_CHARACTERS.length()
                            )
                    )
            );
        }


        // Shuffle the password
        char[] passwordArray =
                password.toString().toCharArray();

        for (int i = passwordArray.length - 1; i > 0; i--) {

            int j = random.nextInt(i + 1);

            char temp = passwordArray[i];

            passwordArray[i] = passwordArray[j];

            passwordArray[j] = temp;
        }


        return new String(passwordArray);
    }


    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("======================================");
        System.out.println("          PASSWORD GENERATOR");
        System.out.println("======================================");

        System.out.println("\nPassword must contain:");
        System.out.println("- Uppercase letters");
        System.out.println("- Lowercase letters");
        System.out.println("- Numbers");
        System.out.println("- Special characters");

        System.out.print("\nEnter password length (4-100): ");


        // Check whether input is a number
        if (!scanner.hasNextInt()) {

            System.out.println(
                    "\nInvalid input. Please enter a number."
            );

            scanner.close();
            return;
        }


        int length = scanner.nextInt();


        // Validate length
        if (length < 4 || length > 100) {

            System.out.println(
                    "\nInvalid length!"
            );

            System.out.println(
                    "Password length must be between 4 and 100."
            );

            scanner.close();
            return;
        }


        // Generate password
        String password =
                generatePassword(length);


        // Display password
        System.out.println("\n======================================");
        System.out.println("             GENERATED PASSWORD");
        System.out.println("======================================");

        System.out.println(password);

        System.out.println("======================================");


        scanner.close();
    }
}