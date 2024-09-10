package br.edu.umfg.prog.tres.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/healthcheck")
public class Healthcheck {
    @GetMapping
    public ResponseEntity<String> get(){

        return ResponseEntity.ok("Hello world!!!");
    }
}