import Navigate from '../Navigate';
import { useEffect } from 'react';
import './Cards.css'

const menus = [
    { menuId: 1, menuName: "salad bar", price: 25000 },
    { menuId: 2, menuName: "stake(220g)", price: 35000 },
    { menuId: 3, menuName: "ribeye(220g)", price: 22500 },
    { menuId: 4, menuName: "stake(210g)", price: 30500 },
    { menuId: 5, menuName: "ade", price: 6500 },
];

  const cardTypes = [
    { cardType: "Credit", title: "credit" },
    { cardType: "Telecom", title: "telecom" },
    { cardType: "Cashbag", title: "cashbag" },
    { cardType: "Point", title: "point" },
  ];
  // const cardTypes = ["Credit", "Telecom", "Cashbag", "Point"];
  const creditCards = [
    {
      cardId: 1,
      cardType: "Credit",
      cardName: "card1 30% off",
      discount: 30,
      discountType: "%",
    },
    {
      cardId: 2,
      cardType: "Credit",
      cardName: "card2 20% off",
      discount: 20,
      discountType: "%",
    },
    {
      cardId: 3,
      cardType: "Telecom",
      cardName: "telecom1 5% off",
      discount: 5,
      discountType: "%",
    },
    {
      cardId: 4,
      cardType: "Telecom",
      cardName: "telecom2 15% off",
      discount: 15,
      discountType: "%",
    },
    {
      cardId: 5,
      cardType: "Cashbag",
      cardName: "cashbag 30% off",
      discount: 30,
      discountType: "%",
    },
    {
      cardId: 6,
      cardType: "Point",
      cardName: "point1 100% off",
      discount: 100,
      discountType: "%",
    },
    {
      cardId: 7,
      cardType: "Point",
      cardName: "point2 20% off",
      discount: 20,
      discountType: "%",
    },
  ];

  const coupons = [
    {
      couponId: 1,
      title: "5% off double",
      discount: 5,
      doubleDiscount: true,
      discountType: "%",
    },
    {
      couponId: 2,
      title: "5000 off double",
      discount: 5000,
      doubleDiscount: true,
      discountType: "",
    },
    {
      couponId: 3,
      title: "15% off",
      discount: 15,
      doubleDiscount: false,
      discountType: "%",
    },
    {
      couponId: 4,
      title: "10000 off",
      discount: 10000,
      doubleDiscount: false,
      discountType: "",
    },
  ];

function calculateTotalAmount() {
    let lineSum = document.getElementsByClassName("lineSum");
    total = 0;
    for (let l of lineSum) {
      total += parseInt(l.value);
    }

    document.getElementById("total").innerText = total;
  }

  function changeLineSum(e, price) {
    let qty = e.target.value;
    let lineSum = e.target.parentNode.parentNode.getElementsByClassName(
      "lineSum"
    )[0];
    lineSum.value = price * parseInt(qty);

    calculateTotalAmount();
  }

  let selectedFood = {};

  function selectFood(menuId) {
    const menu = menus.filter((m) => m.menuId == menuId)[0];
    /*
          const menu = menus.filter(function dummyFunction(m) {
            return m.menuId == menuId;
          })[0];
          */

    if (selectedFood[menu.menuId]) {
      return alert("already included menu.");
    }

    selectedFood[menu.menuId] = menu;

    let tr = [];
    tr.push("<tr>");
    tr.push(`<td>${menu.menuName}</td>`);
    tr.push(`<td>${menu.price}</td>`);
    tr.push(
      `<td><input type="number" value="1" step="1" min="1" onchange="changeLineSum(event, ${menu.price});"></td>`
    );
    tr.push(
      `<td><input type="text" value="${
        menu.price * 1
      }" class="lineSum" readonly></td>`
    );
    tr.push("</tr>");
    document
      .getElementById("selectedMenusTb")
      .insertAdjacentHTML("beforeend", tr.join(""));

    calculateTotalAmount();
  }

  function Loadmenus() {
    let h = [];
    
    for (let menu of menus) {
        h.push(
          `<button class="menu" onclick="selectFood(${menu.menuId});">${menu.menuName}(${menu.price})</button>`
        );
    }
    
    useEffect(() => {
        function menuslist() {
            document.getElementById("divMenus").innerHTML = h.join("");
        }

        return menuslist();
    });
    // for (let menu of menus) {
    //   h.push(
    //     `<button class="menu" onclick="selectFood(${menu.menuId});">${menu.menuName}(${menu.price})</button>`
    //   );
    // }
    
    // document.getElementById("divMenus").innerHTML = h.join("");
  }

  // function loadCards() {
  //   let selectedCards = {};

  //   for (let card of creditCards) {
  //     if (!selectedCards[card.cardType]) {
  //       selectedCards[card.cardType] = [];
  //     }

  //     selectedCards[card.cardType].push(card);
  //   }

  //   for (key in selectedCards) {
  //     let h = [];
  //     h.push(
  //       `<option value="">${
  //         cardTypes.filter(function dummyFunction(c) {
  //           return c.cardType == key;
  //         })[0].title
  //         cardTypes.filter((c) => c.cardType == key)[0].title
  //       } select.</option>`
  //     );
  //     for (card of selectedCards[key]) {
  //       h.push(
  //         `<option value="${card.discount}">${card.cardName}</option>`
  //       );
  //     }

  //     document.getElementById("sel" + key).innerHTML = h.join("");
  //   }

  //   let h = [];
  //   h.push(`<option value="">select discount coupon.</option>`);
  //   for (let coupon of coupons) {
  //     h.push(`<option value="${coupon.couponId}">${coupon.title}</option>`);
  //   }
  //   document.getElementById("selCoupons").innerHTML = h.join("");
  // }

  function Loadcards() {
    let oCards = {};

    for (let card of creditCards) {
      if (!oCards[card.cardType]) {
        oCards[card.cardType] = [];
      }

      oCards[card.cardType].push(card);
    }

    for (let key in oCards) {
      let h = [];
      h.push(
        `<option value = "">select ${
          cardTypes.filter((c) => c.cardType == key)[0].title
        }.</option>`
      );
      for (let card of oCards[key]) {
        h.push(
          `<option value="${card.discount}">${card.cardName}</option>`
        );
      }

      useEffect(() => {
        function sel() {
            document.getElementById("sel" + key).innerHTML = h.join("");
        }

        return sel();
      })

      //document.getElementById("sel" + key).innerHTML = h.join("");
    }
    let h = [];
    h.push(`<option value="">select discount coupon.</option>`);
    for (let coupon of coupons) {
      h.push(`<option value="${coupon.couponId}">${coupon.title}</option>`);
    }

    useEffect(() => {
        function selcoupons() {
            document.getElementById("selCoupons").innerHTML = h.join("");
        }
        
        return selcoupons();

    })
  }

  let total = 0;

  function calculateAmount() {
    if (total == 0) {
      return alert("first select menu.");
    }

    let realTotal = total;

    let discount = 0;
    for (let type of cardTypes) {
      if (document.getElementById("sel" + type.cardType).value != "") {
        let cardDiscount = parseInt(
          document.getElementById("sel" + type.cardType).value
        );
        if (cardDiscount > discount) {
          discount = cardDiscount;
        }
      }
    }

    let couponId = document.getElementById("selCoupons").value;
    let coupon = null;
    if (couponId != "") {
      coupon = coupons.filter((c) => c.couponId == couponId)[0];
    }

    let couponDiscount = 0;
    if (coupon != null && coupon.doubleDiscount) {
      if (coupon.discountType == "%") {
        couponDiscount = Math.round((total * coupon.discount) / 100);
      } else {
        couponDiscount = coupon.discount;
      }

      if (discount > 0) {
        realTotal =
          realTotal - couponDiscount - (realTotal * discount) / 100;
      } else {
        realTotal = realTotal - couponDiscount;
      }
    } else {
      if (discount > 0) {
        if (coupon != null) {
          if (coupon.discountType == "%") {
            couponDiscount = (realTotal * coupon.discount) / 100;
          } else {
            couponDiscount = coupon.discount;
          }
          if ((realTotal * discount) / 100 > couponDiscount) {
            realTotal = realTotal - (realTotal * discount) / 100;
          } else {
            realTotal = realTotal - couponDiscount;
          }
        } else {
          realTotal = realTotal - (realTotal * discount) / 100;
        }
      } else if (coupon != null) {
        if (coupon.discountType == "%") {
          couponDiscount = (realTotal * coupon.discount) / 100;
        } else {
          couponDiscount = coupon.discount;
        }
        realTotal = realTotal - couponDiscount;
      }
    }
    document.getElementById("realTotal").innerText = realTotal;
    document.getElementById("divRealTotal").style.display = "";
  }
  
  window.addEventListener("load", function () {
    // Loadmenus();
    // Loadcards();
  });

export default function Choose() {
  const selected = {first: null, second: null, decision: null};
  const options = [
    `<span>&#9994;</span>`,
    `<span>&#9996;</span>`,
    `<span>&#9995;</span>`
  ];
  
  function selection(option, order) {
    if (order === 'first') {
      if (option === 'r') {
        document.getElementById('optionFirst').innerHTML = options[0];
      } else if (option === 's') {
        document.getElementById('optionFirst').innerHTML = options[1];
      } else {
        document.getElementById('optionFirst').innerHTML = options[2];
      }
      selected.first = option;
    } else {
      if (option === 'r') {
        document.getElementById('optionSecond').innerHTML = options[0];
      } else if (option === 's') {
        document.getElementById('optionSecond').innerHTML = options[1];
      } else {
        document.getElementById('optionSecond').innerHTML = options[2];
      }
      selected.second = option;
    }
  }
  const opponentOptions = [];
  function compete(element) {
    if (element.length === 0) {
      if (selected.first !== null && selected.second !== null) {
        opponentOptions.push(Math.floor(Math.random()*3));
        opponentOptions.push(Math.floor(Math.random()*3));
        if (opponentOptions[0] === 0) {
          document.getElementById('opponentFirst').innerHTML = options[0];
          opponentOptions[0] = 'r'
        } else if (opponentOptions[0] === 1) {
          document.getElementById('opponentFirst').innerHTML = options[1];
          opponentOptions[0] = 's'
        } else {
          document.getElementById('opponentFirst').innerHTML = options[2];
          opponentOptions[0] = 'p'
        }
        if (opponentOptions[1] === 0) {
          document.getElementById('opponentSecond').innerHTML = options[0];
          opponentOptions[1] = 'r'
        } else if (opponentOptions[1] === 1) {
          document.getElementById('opponentSecond').innerHTML = options[1];
          opponentOptions[1] = 's'
        } else {
          document.getElementById('opponentSecond').innerHTML = options[2];
          opponentOptions[1] = 'p'
        }
      } else {
        alert('need to select from options')
      }
    } else {
      if (selected.decision !== null) {
        if (selected.decision === 'r') {
          document.getElementById('optionDecision').innerHTML = 'Chose ' + options[0];
        } else if (selected.decision === 's') {
          document.getElementById('optionDecision').innerHTML = 'Chose ' + options[1];
        } else {
          document.getElementById('optionDecision').innerHTML = 'Chose ' + options[2];
        }
        let opponentOption = Math.floor(Math.random());
        let competition;
        if (opponentOption < 0.5) {
          opponentOptions.push(opponentOptions[0]);
        } else {
          opponentOptions.push(opponentOptions[1]);
        }
        if (opponentOptions[2] === 'r') {
          if (selected.decision === 'r') {
            competition = 'draw';
          } else if (selected.decision === 's') {
            competition = 'lose';
          } else {
            competition = 'win';
          }
          document.getElementById('opponentDecision').innerHTML = 'Opponent chose ' + options[0];
          document.getElementById('guess').innerHTML = 'Result: ' + competition
        } else if (opponentOptions[2] === 's') {
          if (selected.decision === 'r') {
            competition = 'win';
          } else if (selected.decision === 's') {
            competition = 'draw';
          } else {
            competition = 'lose';
          }
          document.getElementById('opponentDecision').innerHTML = 'Opponent chose ' + options[1];
          document.getElementById('guess').innerHTML = 'Result: '
        } else {
          if (selected.decision === 'r') {
            competition = 'lose';
          } else if (selected.decision === 's') {
            competition = 'win';
          } else {
            competition = 'draw';
          }
          document.getElementById('opponentDecision').innerHTML = 'Opponent chose ' + options[2];
          document.getElementById('guess').innerHTML = 'Result: '
        }
      } else {
        alert('need to select from options')
      }
    }
  }
  function decide(order) {
    if (selected.first !== null && selected.second !== null) {
      if (order === 'first') {
        selected.decision = selected.first;
      } else {
        selected.decision = selected.second;
      }
    }
  }
  return (
    <main>
      <Navigate />
            {/* <div className='fadein'>
            <Loadmenus />
            <Loadcards />
            <p>menu</p>
    <div id="divMenus" className="container bg-primary"></div>
    <div>
      <table>
        <thead>
          <tr>
            <th>menus</th>
            <th>price</th>
            <th>amount</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody id="selectedMenusTb"></tbody>
        <tfoot id="selectedMenuTotal">
          <tr>
            <td id="tdTotal" colSpan="3">total</td>
            <td><strong id="total"></strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p>discount</p>
    <div id="divDiscount" className="container bg-secondary">
      <div>
        <select name="" id="selCredit"></select>
      </div>
      <div>
        <select name="" id="selTelecom"></select>
      </div>
      <div>
        <select name="" id="selCashbag"></select>
      </div>
      <div>
        <select name="" id="selPoint"></select>
      </div>
      <div>
        <select name="" id="selCoupons"></select>
      </div>
    </div>
    <div id="divCalculate">
      <button className="btnCal" onClick={calculateAmount}>calculate</button>
    </div>
    <div id="divRealTotal" style={{display: 'none'}}>
      <p>total purchase price: <strong id="realTotal"></strong></p>
    </div>
    </div> */}
    <div className="h3 p-5 text-center centered">Choose</div>
      <div className='option'>
        <div>
          Opponent's Option First
          <br />
          <div id='opponentFirst'>
            <br />
          </div>
        </div>
        <div>&emsp;</div>
        <div>
          Opponent's Option Second
          <br />
          <div id='opponentSecond'>
            <br />
          </div>
        </div>
      </div>
      <div id='opponentDecision'>
        <br />
      </div>
      <div className='option'>
        <div>
          My Option First
          <br />
          <span onClick={() => selection('r', 'first')}>&#9994;</span>
          <span onClick={() => selection('s', 'first')}>&#9996;</span>
          <span onClick={() => selection('p', 'first')}>&#9995;</span>
          <div id='optionFirst' onClick={() => decide('first')}>
            <br />
          </div>
        </div>
        <div>&emsp;</div>
        <div>
          My Option Second
          <br />
          <span onClick={() => selection('r', 'second')}>&#9994;</span>
          <span onClick={() => selection('s', 'second')}>&#9996;</span>
          <span onClick={() => selection('p', 'second')}>&#9995;</span>
          <div id='optionSecond' onClick={() => decide('second')}>
            <br />
          </div>
        </div>
      </div>
      <div id='optionDecision'>
        <br />
      </div>
      <div id='selection'>
        <br />
      </div>
      <div className='btn btn-primary' onClick={() => compete(opponentOptions)}>ready</div>
      <div id='guess'></div>
    </main>
  );
}