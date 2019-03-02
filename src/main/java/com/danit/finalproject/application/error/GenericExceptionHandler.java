package com.danit.finalproject.application.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Arrays;

@ControllerAdvice
@Slf4j
public class GenericExceptionHandler {

  @ExceptionHandler({KnownException.class})
  public ResponseEntity<String> handleKnownException(KnownException exc) {
    // after creating controllers add known exceptions to annotation and
    // use different status code if needed
    log.warn(exc.getMessage());
    return new ResponseEntity<>(exc.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<String> handleUnknownException(Exception exc) {
    String stackTrace = Arrays.stream(exc.getStackTrace())
        .map(e -> e.toString() + "\n")
        .reduce((e1, e2) -> e1 + e2)
        .orElse("");
    log.error(String.format("%s\n%s", exc.getMessage(), stackTrace));
    return new ResponseEntity<>(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
