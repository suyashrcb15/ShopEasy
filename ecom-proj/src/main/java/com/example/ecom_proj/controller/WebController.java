package com.example.ecom_proj.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    // Forward React routes (non-API paths) to index.html
    @RequestMapping(value = {
        "/", 
        "/about", 
        "/contact", 
        "/addproduct", 
        "/cart", 
        "/product/**"
    })
    public String forwardToFrontend() {
        return "forward:/index.html";
    }
}
