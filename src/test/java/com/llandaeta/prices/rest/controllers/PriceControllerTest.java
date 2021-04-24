package com.llandaeta.prices.rest.controllers;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PriceControllerTest{

    private final WebApplicationContext wac;
    private MockMvc mockMvc;

    @Autowired
    PriceControllerTest(WebApplicationContext wac){
        this.wac = wac;
    }

    @BeforeAll
    public void setup(){
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    void shouldReturnSuccessful_PriceToApplyForTheDate20200614_100000() throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders.get("/api/price?brandId={brandId}&productId={productId}&applicationDate={applicationDate}", 1, 35455, "2020-06-14 10:00:00")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.productId", is(35455)))
                .andExpect(jsonPath("$.brandId", is(1)))
                .andExpect(jsonPath("$.priceList", is(1)))
                .andExpect(jsonPath("$.startDate", is("2020-06-14T00:00:00")))
                .andExpect(jsonPath("$.endDate", is("2020-12-31T23:59:59")))
                .andExpect(jsonPath("$.price", is(35.5)));
    }

    @Test
    void shouldReturnSuccessful_PriceToApplyForTheDate20200614_160000() throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders.get("/api/price?brandId={brandId}&productId={productId}&applicationDate={applicationDate}", 1, 35455, "2020-06-14 16:00:00")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.brandId", is(1)))
                .andExpect(jsonPath("$.productId", is(35455)))
                .andExpect(jsonPath("$.priceList", is(2)))
                .andExpect(jsonPath("$.startDate", is("2020-06-14T15:00:00")))
                .andExpect(jsonPath("$.endDate", is("2020-06-14T18:30:00")))
                .andExpect(jsonPath("$.price", is(25.45)));
    }

    @Test
    void shouldReturnSuccessful_PriceToApplyForTheDate20200614_210000() throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders.get("/api/price?brandId={brandId}&productId={productId}&applicationDate={applicationDate}", 1, 35455, "2020-06-14 21:00:00")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.brandId", is(1)))
                .andExpect(jsonPath("$.productId", is(35455)))
                .andExpect(jsonPath("$.priceList", is(1)))
                .andExpect(jsonPath("$.startDate", is("2020-06-14T00:00:00")))
                .andExpect(jsonPath("$.endDate", is("2020-12-31T23:59:59")))
                .andExpect(jsonPath("$.price", is(35.50)));
    }

    @Test
    void shouldReturnSuccessful_PriceToApplyForTheDate20200615_100000() throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders.get("/api/price?brandId={brandId}&productId={productId}&applicationDate={applicationDate}", 1, 35455, "2020-06-15 10:00:00")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.brandId", is(1)))
                .andExpect(jsonPath("$.productId", is(35455)))
                .andExpect(jsonPath("$.priceList", is(3)))
                .andExpect(jsonPath("$.startDate", is("2020-06-15T00:00:00")))
                .andExpect(jsonPath("$.endDate", is("2020-06-15T11:00:00")))
                .andExpect(jsonPath("$.price", is(30.50)));
    }

    @Test
    void shouldReturnSuccessful_PriceToApplyForTheDate20200616_210000() throws Exception{
        this.mockMvc.perform(MockMvcRequestBuilders.get("/api/price?brandId={brandId}&productId={productId}&applicationDate={applicationDate}", 1, 35455, "2020-06-16 21:00:00")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.brandId", is(1)))
                .andExpect(jsonPath("$.productId", is(35455)))
                .andExpect(jsonPath("$.priceList", is(4)))
                .andExpect(jsonPath("$.startDate", is("2020-06-16T00:00:00")))
                .andExpect(jsonPath("$.endDate", is("2020-12-31T23:59:59")))
                .andExpect(jsonPath("$.price", is(38.95)));
    }

}