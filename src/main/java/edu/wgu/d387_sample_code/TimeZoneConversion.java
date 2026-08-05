package edu.wgu.d387_sample_code; // Use your project's actual package name

import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class TimeZoneConversion {

    public static String getConvertedTimes() {
        // Get current or presentation time in Eastern Time
        ZonedDateTime etTime = ZonedDateTime.now(ZoneId.of("America/New_York"));

        // Convert to Mountain Time and UTC using withZoneSameInstant
        ZonedDateTime mtTime = etTime.withZoneSameInstant(ZoneId.of("America/Denver"));
        ZonedDateTime utcTime = etTime.withZoneSameInstant(ZoneId.of("UTC"));

        // Format to hours and minutes (HH:mm)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        // Concatenate the results into a single string format requested by the rubric
        return etTime.format(formatter) + " ET, " +
                mtTime.format(formatter) + " MT, " +
                utcTime.format(formatter) + " UTC";
    }
}