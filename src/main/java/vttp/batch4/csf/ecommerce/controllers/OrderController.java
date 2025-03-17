package vttp.batch4.csf.ecommerce.controllers;


import jakarta.json.Json;
import jakarta.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping("/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/checkout", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody Order order) {

    // TODO Task 3
    try {
      poSvc.createNewPurchaseOrder(order);

      JsonObject response = Json.createObjectBuilder()
              .add("orderId", order.getOrderId())
              .build();

      return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(response.toString());
    } catch (Exception e) {
      JsonObject error = Json.createObjectBuilder()
              .add("message", e.getMessage())
              .build();
      return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(error.toString());
    }
  }
}
