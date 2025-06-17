$(document).ready(function () {
  // 1. Quantity update and subtotal calculation
  $(".qty-btn-plus").click(function () {
    const $input = $(this).siblings(".qty-item");
    let value = parseInt($input.val()) || 0;
    $input.val(++value);
    updateSubtotal();
  });

  $(".qty-btn-minus").click(function () {
    const $input = $(this).siblings(".qty-item");
    let value = parseInt($input.val()) || 0;
    if (value > 0) {
      $input.val(--value);
      updateSubtotal();
    }
  });

  function updateSubtotal() {
    let subtotal = 0;

    $(".ticket-option").each(function () {
      const quantity = parseInt($(this).find(".qty-item").val()) || 0;
      const unitPrice =
        parseFloat($(this).find(".price-total").data("price")) || 0;
      const vat = parseFloat($(this).find(".price-total").data("vat")) || 0;
      subtotal += quantity * (unitPrice + vat);
    });

    $(".subtotal-tb input").val(`£ ${subtotal.toFixed(2)}`);
  }

  // 2. Save data on "Continue"
  $('.nav-btns a[href$="Nav2_Details.html"]').click(function () {
    const tickets = [];

    $(".ticket-option").each(function () {
      const title = $(this).find(".ticket-title").text().trim();
      const quantity = parseInt($(this).find(".qty-item").val()) || 0;
      const unitPrice =
        parseFloat($(this).find(".price-total").data("price")) || 0;
      const vat = parseFloat($(this).find(".price-total").data("vat")) || 0;

      if (quantity > 0) {
        tickets.push({
          title,
          quantity,
          unitPrice,
          vat,
          total: quantity * (unitPrice + vat)
        });
      }
    });

    const checkoutData = {
      tickets,
      subtotal:
        parseFloat($(".subtotal-tb input").val().replace("£", "").trim()) || 0
    };

    localStorage.setItem("checkoutInfo", JSON.stringify(checkoutData));
  });

  // 3. Render on next page
  if ($(".ticket-list").length && $(".billing-form").length) {
    const checkoutInfo = JSON.parse(localStorage.getItem("checkoutInfo"));

    if (checkoutInfo && checkoutInfo.tickets?.length > 0) {
      checkoutInfo.tickets.forEach((ticket) => {
        // Append ticket summary to `.ticket-list`
        const ticketHTML = `
          <div class="ordered-item">
            <p class="item-title">${ticket.title}</p>
            <p class="item-sched"><i class="fa-solid fa-calendar-days"></i> Wednesday, July 30, 2025 - 11:30PM Sunday</p>
            <div class="item-qp">
              <p>Quantity: ${ticket.quantity}</p>
              <p>Price: £ ${(ticket.unitPrice * ticket.quantity).toFixed(
                2
              )} + £ ${(ticket.vat * ticket.quantity).toFixed(2)} VAT</p>
            </div>
          </div>`;
        $(".ticket-list").append(ticketHTML);

        // For each quantity, append a form to `.billing-form`
        for (let i = 1; i <= ticket.quantity; i++) {
          const formHTML = `
            <div class="attendee-form">
              <h3>${ticket.title} - Attendee ${i}</h3>
              <div class="form-row">
                <label>First Name:</label>
                <input type="text" name="${ticket.title}_attendee_${i}_firstName" required>
              </div>
              <div class="form-row">
                <label>Last Name:</label>
                <input type="text" name="${ticket.title}_attendee_${i}_lastName" required>
              </div>
              <div class="form-row">
                <label>Contact Info:</label>
                <input type="text" name="${ticket.title}_attendee_${i}_lastName" required>
              </div>
              <div class="form-row">
                <label>Email:</label>
                <input type="email" name="${ticket.title}_attendee_${i}_email" required>
              </div>
            </div>`;
          $(".billing-form").append(formHTML);
        }
      });

      $(".subtotal-value").text(`£ ${checkoutInfo.subtotal.toFixed(2)}`);
    } else {
      $(".ticket-list").html("<p>No tickets selected.</p>");
    }
  }
});
