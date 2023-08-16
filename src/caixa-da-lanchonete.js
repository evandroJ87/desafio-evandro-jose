const CARDAPIO = {
  cafe: 3,
  suco: 6.2,
  sanduiche: 6.5,
  salgado: 7.25,
  combo1: 9.5,
  combo2: 7.5,

  chantily: {
    preco: 1.5,
    extraDe: "cafe",
  },
  queijo: {
    preco: 2,
    extraDe: "sanduiche",
  },
}

const CHOICE_PAYMENT = {
  credito: "credito",
  dinheiro: "dinheiro",
  debito: "debito",
}

const ACRESCIMO = 0.03

const DESCONTO= 0.05

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens = []) {
    let pedido = {}
    let erros = []

    if (!CHOICE_PAYMENT[metodoDePagamento]) {
      return "Forma de pagamento inválida!"
    }

    if (itens.length <= 0) {
      return "Não há itens no carrinho de compra!"
    }

    itens.forEach((item, _index, array) => {
      const [produto, quantidade] = item.trim().toLowerCase().split(",")

      if (!(produto in CARDAPIO)) {
        erros.push("Item inválido!")
      }

      if (quantidade <= 0) {
        erros.push("Quantidade inválida!")
      }

      pedido[produto] = quantidade

      if (
        CARDAPIO[produto]?.extraDe &&
        !array.some((i) => i.trim().toLowerCase().split(",")[0] === CARDAPIO[produto]?.extraDe)
      ) {
        erros.push(
          "Item extra não pode ser pedido sem o principal"
        )
      }
    })

    if (erros.length > 0) {
      return erros.join("\n")
    } else {

      let valorTotal = 0
      for (let produto in pedido) {
        const precoProduto =
          (CARDAPIO[produto]?.preco ?? CARDAPIO[produto]) * pedido[produto]
        valorTotal += precoProduto
      }

      return this.calcularDescontoOuAcrescimo(metodoDePagamento, valorTotal)
    }
  }

calcularDescontoOuAcrescimo(metodoDePagamento, valorTotal) {
    const format = (number) => {
      number = number.toFixed(2).replace(".", ",")
      return `R$ ${number}`
    }

    switch (metodoDePagamento) {
      case CHOICE_PAYMENT.credito: {
        return format(valorTotal + valorTotal * ACRESCIMO)
      }

      case CHOICE_PAYMENT.dinheiro: {
        const desconto = valorTotal * DESCONTO
        return format(valorTotal - desconto)
      }

      case CHOICE_PAYMENT.debito: {
        return format(valorTotal)
      }
    }
  }
}


export { CaixaDaLanchonete }