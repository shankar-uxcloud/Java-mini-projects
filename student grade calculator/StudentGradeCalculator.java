import java.util.Scanner;

public class StudentGradeCalculator {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("======================================");
        System.out.println("       STUDENT GRADE CALCULATOR");
        System.out.println("======================================");

        System.out.print("\nEnter number of subjects: ");
        int subjects = scanner.nextInt();

        int[] marks = new int[subjects];

        int total = 0;

        // Input marks
        for (int i = 0; i < subjects; i++) {

            System.out.print("Enter marks for Subject " + (i + 1) + ": ");
            marks[i] = scanner.nextInt();

            // Validate marks
            while (marks[i] < 0 || marks[i] > 100) {

                System.out.println("Invalid marks! Enter marks between 0 and 100.");

                System.out.print("Enter marks for Subject " + (i + 1) + ": ");
                marks[i] = scanner.nextInt();
            }

            total += marks[i];
        }

        // Calculate average
        double average = (double) total / subjects;

        // Assign grade
        String grade;

        if (average >= 90) {
            grade = "A";
        }
        else if (average >= 75) {
            grade = "B";
        }
        else if (average >= 50) {
            grade = "C";
        }
        else {
            grade = "Fail";
        }

        // Display result
        System.out.println("\n======================================");
        System.out.println("              RESULT");
        System.out.println("======================================");

        System.out.println("Total Marks : " + total);
        System.out.printf("Average     : %.2f%%\n", average);
        System.out.println("Grade       : " + grade);

        System.out.println("======================================");

        scanner.close();
    }
}