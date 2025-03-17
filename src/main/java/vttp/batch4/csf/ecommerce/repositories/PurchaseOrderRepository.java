package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  private final String INSERT_ORDERS_SQL = """
      INSERT INTO orders (orderId, date, name, address, priority, comments)
      VALUES (?, ?, ?, ?, ?, ?)
      """;
  private final String INSERT_LINEITEMS_SQL = """
      INSERT INTO order_items (orderId, productId, name, quantity, price)
      VALUES (?, ?, ?, ?, ?)
      """;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    template.update(INSERT_ORDERS_SQL,
            order.getOrderId(),
            order.getDate(),
            order.getName(),
            order.getAddress(),
            order.isPriority(),
            order.getComments()
    );

    for (LineItem item : order.getCart().getLineItems()) {
      template.update(INSERT_LINEITEMS_SQL,
              order.getOrderId(),
              item.getProductId(),
              item.getName(),
              item.getQuantity(),
              item.getPrice()
      );
    }
  }
}
