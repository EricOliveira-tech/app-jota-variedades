export interface Produto {
  id: string
  nome: string
  preco: number
  estoque: number
  minimo: number
  categoria: string
}

export interface ItemVenda {
  produtoId: string
  nome: string
  quantidade: number
  precoUnitario: number
}

export interface Venda {
  id: string
  itens: ItemVenda[]
  total: number
  formaPagamento: "pix" | "dinheiro" | "cartao"
  horario: string
  data: string
}

export type StatusEncomenda = "pendente" | "chegou" | "separado" | "entregue" | "cancelado"

export interface Encomenda {
  id: string
  cliente: string
  telefone: string
  itens: ItemVenda[]
  total: number
  status: StatusEncomenda
  observacao?: string
  dataCriacao: string
  dataAtualizacao: string
}

export const produtos: Produto[] = [
  { id: "1", nome: "Película Samsung A32", preco: 25, estoque: 2, minimo: 5, categoria: "Películas" },
  { id: "2", nome: "Cabo Type-C 1m", preco: 20, estoque: 1, minimo: 6, categoria: "Cabos" },
  { id: "3", nome: "Capinha iPhone 11", preco: 35, estoque: 10, minimo: 3, categoria: "Capinhas" },
  { id: "4", nome: "Carregador USB 20W", preco: 45, estoque: 8, minimo: 4, categoria: "Carregadores" },
  { id: "5", nome: "Smartwatch D20", preco: 89, estoque: 3, minimo: 2, categoria: "Smartwatch" },
  { id: "6", nome: "Película iPhone 13", preco: 30, estoque: 0, minimo: 5, categoria: "Películas" },
  { id: "7", nome: "Cabo Lightning 1m", preco: 25, estoque: 4, minimo: 6, categoria: "Cabos" },
  { id: "8", nome: "Capinha Samsung A54", preco: 30, estoque: 12, minimo: 5, categoria: "Capinhas" },
  { id: "9", nome: "Fone Bluetooth TWS", preco: 65, estoque: 0, minimo: 3, categoria: "Fones" },
  { id: "10", nome: "Carregador Veicular", preco: 35, estoque: 6, minimo: 4, categoria: "Carregadores" },
]

export const vendas: Venda[] = [
  {
    id: "v1",
    itens: [{ produtoId: "1", nome: "Película Samsung A32", quantidade: 2, precoUnitario: 25 }],
    total: 50,
    formaPagamento: "pix",
    horario: "09:15",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v2",
    itens: [
      { produtoId: "3", nome: "Capinha iPhone 11", quantidade: 1, precoUnitario: 35 },
      { produtoId: "2", nome: "Cabo Type-C 1m", quantidade: 1, precoUnitario: 20 },
    ],
    total: 55,
    formaPagamento: "cartao",
    horario: "10:30",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v3",
    itens: [{ produtoId: "4", nome: "Carregador USB 20W", quantidade: 1, precoUnitario: 45 }],
    total: 45,
    formaPagamento: "dinheiro",
    horario: "11:45",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v4",
    itens: [{ produtoId: "5", nome: "Smartwatch D20", quantidade: 2, precoUnitario: 89 }],
    total: 178,
    formaPagamento: "pix",
    horario: "14:20",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v5",
    itens: [{ produtoId: "8", nome: "Capinha Samsung A54", quantidade: 3, precoUnitario: 30 }],
    total: 90,
    formaPagamento: "pix",
    horario: "15:10",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v6",
    itens: [{ produtoId: "10", nome: "Carregador Veicular", quantidade: 1, precoUnitario: 35 }],
    total: 35,
    formaPagamento: "dinheiro",
    horario: "16:00",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v7",
    itens: [
      { produtoId: "7", nome: "Cabo Lightning 1m", quantidade: 2, precoUnitario: 25 },
      { produtoId: "1", nome: "Película Samsung A32", quantidade: 1, precoUnitario: 25 },
    ],
    total: 75,
    formaPagamento: "pix",
    horario: "16:45",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v8",
    itens: [{ produtoId: "3", nome: "Capinha iPhone 11", quantidade: 2, precoUnitario: 35 }],
    total: 70,
    formaPagamento: "pix",
    horario: "17:30",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v9",
    itens: [{ produtoId: "4", nome: "Carregador USB 20W", quantidade: 1, precoUnitario: 45 }],
    total: 45,
    formaPagamento: "pix",
    horario: "18:00",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v10",
    itens: [{ produtoId: "2", nome: "Cabo Type-C 1m", quantidade: 1, precoUnitario: 20 }],
    total: 20,
    formaPagamento: "dinheiro",
    horario: "18:30",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v11",
    itens: [{ produtoId: "8", nome: "Capinha Samsung A54", quantidade: 1, precoUnitario: 30 }],
    total: 30,
    formaPagamento: "pix",
    horario: "19:00",
    data: new Date().toISOString().split("T")[0],
  },
  {
    id: "v12",
    itens: [{ produtoId: "5", nome: "Smartwatch D20", quantidade: 1, precoUnitario: 89 }],
    total: 89,
    formaPagamento: "pix",
    horario: "19:30",
    data: new Date().toISOString().split("T")[0],
  },
]

export const encomendas: Encomenda[] = [
  {
    id: "e1",
    cliente: "Maria Silva",
    telefone: "(11) 99999-1111",
    itens: [{ produtoId: "6", nome: "Película iPhone 13", quantidade: 2, precoUnitario: 30 }],
    total: 60,
    status: "pendente",
    observacao: "Cliente vai buscar sexta-feira",
    dataCriacao: "2024-01-15",
    dataAtualizacao: "2024-01-15",
  },
  {
    id: "e2",
    cliente: "João Santos",
    telefone: "(11) 98888-2222",
    itens: [{ produtoId: "9", nome: "Fone Bluetooth TWS", quantidade: 1, precoUnitario: 65 }],
    total: 65,
    status: "chegou",
    dataCriacao: "2024-01-14",
    dataAtualizacao: "2024-01-16",
  },
  {
    id: "e3",
    cliente: "Ana Oliveira",
    telefone: "(11) 97777-3333",
    itens: [
      { produtoId: "3", nome: "Capinha iPhone 11", quantidade: 1, precoUnitario: 35 },
      { produtoId: "1", nome: "Película Samsung A32", quantidade: 1, precoUnitario: 25 },
    ],
    total: 60,
    status: "pendente",
    dataCriacao: "2024-01-16",
    dataAtualizacao: "2024-01-16",
  },
  {
    id: "e4",
    cliente: "Carlos Ferreira",
    telefone: "(11) 96666-4444",
    itens: [{ produtoId: "5", nome: "Smartwatch D20", quantidade: 1, precoUnitario: 89 }],
    total: 89,
    status: "separado",
    observacao: "Presente de aniversário",
    dataCriacao: "2024-01-13",
    dataAtualizacao: "2024-01-16",
  },
  {
    id: "e5",
    cliente: "Lucia Mendes",
    telefone: "(11) 95555-5555",
    itens: [{ produtoId: "7", nome: "Cabo Lightning 1m", quantidade: 3, precoUnitario: 25 }],
    total: 75,
    status: "pendente",
    dataCriacao: "2024-01-16",
    dataAtualizacao: "2024-01-16",
  },
  {
    id: "e6",
    cliente: "Pedro Costa",
    telefone: "(11) 94444-6666",
    itens: [{ produtoId: "4", nome: "Carregador USB 20W", quantidade: 2, precoUnitario: 45 }],
    total: 90,
    status: "chegou",
    dataCriacao: "2024-01-12",
    dataAtualizacao: "2024-01-15",
  },
  {
    id: "e7",
    cliente: "Fernanda Lima",
    telefone: "(11) 93333-7777",
    itens: [{ produtoId: "8", nome: "Capinha Samsung A54", quantidade: 2, precoUnitario: 30 }],
    total: 60,
    status: "pendente",
    dataCriacao: "2024-01-16",
    dataAtualizacao: "2024-01-16",
  },
  {
    id: "e8",
    cliente: "Roberto Alves",
    telefone: "(11) 92222-8888",
    itens: [{ produtoId: "6", nome: "Película iPhone 13", quantidade: 1, precoUnitario: 30 }],
    total: 30,
    status: "pendente",
    dataCriacao: "2024-01-15",
    dataAtualizacao: "2024-01-15",
  },
  {
    id: "e9",
    cliente: "Mariana Souza",
    telefone: "(11) 91111-9999",
    itens: [{ produtoId: "9", nome: "Fone Bluetooth TWS", quantidade: 2, precoUnitario: 65 }],
    total: 130,
    status: "pendente",
    dataCriacao: "2024-01-16",
    dataAtualizacao: "2024-01-16",
  },
  {
    id: "e10",
    cliente: "Bruno Martins",
    telefone: "(11) 90000-0000",
    itens: [{ produtoId: "2", nome: "Cabo Type-C 1m", quantidade: 5, precoUnitario: 20 }],
    total: 100,
    status: "pendente",
    dataCriacao: "2024-01-16",
    dataAtualizacao: "2024-01-16",
  },
]

export const getResumoVendas = () => {
  const hoje = new Date().toISOString().split("T")[0]
  const vendasHoje = vendas.filter((v) => v.data === hoje)

  return {
    total: vendasHoje.reduce((acc, v) => acc + v.total, 0),
    quantidade: vendasHoje.length,
    pix: vendasHoje.filter((v) => v.formaPagamento === "pix").length,
    dinheiro: vendasHoje.filter((v) => v.formaPagamento === "dinheiro").length,
    cartao: vendasHoje.filter((v) => v.formaPagamento === "cartao").length,
    totalPix: vendasHoje.filter((v) => v.formaPagamento === "pix").reduce((acc, v) => acc + v.total, 0),
    totalDinheiro: vendasHoje.filter((v) => v.formaPagamento === "dinheiro").reduce((acc, v) => acc + v.total, 0),
    totalCartao: vendasHoje.filter((v) => v.formaPagamento === "cartao").reduce((acc, v) => acc + v.total, 0),
  }
}

export const getProdutosBaixoEstoque = () => {
  return produtos.filter((p) => p.estoque <= p.minimo)
}

export const getEncomendasPendentes = () => {
  return encomendas.filter((e) => e.status === "pendente" || e.status === "chegou" || e.status === "separado")
}
