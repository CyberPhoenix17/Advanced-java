package edu.wgu.d387_sample_code.i18n;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WelcomeController {

    @GetMapping("/welcome")
    public List<String> getWelcomeMessages() {
        // Create thread for English (US)
        DisplayMessage englishGreeting = new DisplayMessage(new Locale("en", "US"));
        Thread thread1 = new Thread(englishGreeting);

        // Create thread for French (Canada)
        DisplayMessage frenchGreeting = new DisplayMessage(new Locale("fr", "CA"));
        Thread thread2 = new Thread(frenchGreeting);

        // Start both threads concurrently
        thread1.start();
        thread2.start();

        try {
            // Wait for both threads to finish execution
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Collect messages into a list to return as JSON
        List<String> messages = new ArrayList<>();
        messages.add(englishGreeting.getMessage());
        messages.add(frenchGreeting.getMessage());

        return messages;
    }
}