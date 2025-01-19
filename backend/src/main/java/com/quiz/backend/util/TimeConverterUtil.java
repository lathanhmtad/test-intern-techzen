package com.quiz.backend.util;

import java.util.concurrent.TimeUnit;

public class TimeConverterUtil {
    public static long getMilliseconds(String input) {
        int spaceIndex = input.indexOf(" ");
        String timeUnit = input.substring(spaceIndex + 1).toLowerCase();
        long number = Long.parseLong(input.substring(0, spaceIndex));

        return switch (timeUnit) {
            case "second", "seconds" -> TimeUnit.SECONDS.toMillis(number);
            case "minute", "minutes" -> TimeUnit.MINUTES.toMillis(number);
            case "hour", "hours" -> TimeUnit.HOURS.toMillis(number);
            case "day", "days" -> TimeUnit.DAYS.toMillis(number);
            default -> throw new IllegalArgumentException(number + "is an unknown value!");
        };
    }

    public static long getSeconds(String input) {
        int spaceIndex = input.indexOf(" ");
        String timeUnit = input.substring(spaceIndex + 1).toLowerCase();
        long number = Long.parseLong(input.substring(0, spaceIndex));

        return switch (timeUnit) {
            case "second", "seconds" -> TimeUnit.SECONDS.toSeconds(number);
            case "minute", "minutes" -> TimeUnit.MINUTES.toSeconds(number);
            case "hour", "hours" -> TimeUnit.HOURS.toSeconds(number);
            case "day", "days" -> TimeUnit.DAYS.toSeconds(number);
            default -> throw new IllegalArgumentException(number + "is an unknown value!");
        };
    }
}
