'use strict'
// https://github.com/ozum/joi18n/blob/master/locales/pt_BR.json
module.exports = {
  root: 'value',
  key: '"{{!label}}" ',
  messages: {
    wrapArrays: true,
    errors: 'A validação falhou: {{limit}} error(s) encontrado(s)',
    password_confirmation: 'deve corresponder a senha informada'
  },
  any: {
    unknown: 'não é permitido',
    invalid: 'contém um valor inválido',
    empty: 'não é permitido ser vazio',
    required: 'é obrigatório',
    allowOnly: 'precisa ser um dos seguintes valores: {{valids}}',
    default: 'ocorreu um erro ao executar o método padrão'
  },
  alternatives: {
    base: 'não corresponde a nenhuma altenativa válida',
    child: null
  },
  array: {
    base: 'deve ser uma matriz',
    includes: 'na posição {{pos}} não corresponde a nenhuma tipo válido',
    includesSingle: 'valor único de {{!label}} não corresponde a nenhuma tipo válido',
    includesOne: 'na posição {{pos}} falha, pois {{reason}}',
    includesOneSingle: 'valor único de {{!label}} falha, pois {{reason}}',
    includesRequiredUnknowns: 'não contém {{unknownMisses}} valor(es) obrigatório(s)',
    includesRequiredKnowns: 'não contém {{knownMisses}}',
    includesRequiredBoth: 'não contém {{knownMisses}} e {{unknownMisses}} outros valor(es) obrigatório(s)',
    excludes: 'na posição {{pos}} contém um valor excluído',
    excludesSingle: 'valor único de {{!label}} contém um valor excluído',
    min: 'deve conter no mínimo {{limit}} itens',
    max: 'deve conter menos que ou igual a {{limit}} itens',
    length: 'deve conter {{limit}} itens',
    ordered: 'na posição {{pos}}  falha, pois {{reason}}',
    orderedLength: 'na posição {{pos}} falha, pois a matriz deve conter até {{limit}} itens',
    ref: 'referência a "{{ref}}" que não é um número inteiro positivo',
    sparse: 'não pode ser uma matriz esparsa',
    unique: 'na posição {{pos}} há um valor duplicado'
  },
  boolean: {
    base: 'deve ser boleano'
  },
  binary: {
    base: 'deve ser um buffer ou uma string',
    min: 'deve conter no mínimo {{limit}} bytes',
    max: 'deve conter no máximo {{limit}} bytes',
    length: 'deve conter {{limit}} bytes'
  },
  date: {
    base: 'deve ser um número em milisegundos ou uma data válida',
    format: 'deve ser um texto com um dos seguintes formatos {{format}}',
    strict: 'deve ser uma data válida',
    min: 'deve ser maior ou igual a {{limit}}',
    max: 'deve ser menor ou igual a {{limit}}',
    isoDate: 'deve ser uma data no padrão ISO 8601',
    timestamp: {
      javascript: 'deve ser um timestamp válido ou um número de milissegundos',
      unix: 'deve ser um timestamp válido ou número de segundos'
    },
    ref: 'referência a {{ref}} que não é uma data'
  },
  function: {
    base: 'deve ser uma função',
    arity: 'deve ter um número de argumentos de {{n}}',
    minArity: 'deve ter um número de argumentos maior ou igual a {{n}}',
    maxArity: 'deve ter um número de argumentos menor ou igual a {{n}}',
    ref: 'deve ser uma referência Joi',
    class: 'deve ser uma classe'
  },
  lazy: {
    base: '!!erro de esquema: o esquema lazy deve ser configurado',
    schema: '!!erro de esquema: a função do esquema lazy deve retornar um esquema'
  },
  object: {
    base: 'deve ser um objeto',
    child: 'falha em {{!child}}, pois {{reason}}',
    min: 'deve conter no mínimo {{limit}} filho(s)',
    max: 'deve conter no máximo {{limit}} filho(s)',
    length: 'deve conter {{limit}} filho(s)',
    allowUnknown: '!!"{{!child}}" não é permitido',
    with: '!!"{{mainWithLabel}}" faltando o peer requerido "{{peerWithLabel}}"',
    without: '!!"{{mainWithLabel}}" conflito com pares proibidos "{{peerWithLabel}}"',
    missing: 'deve conter pelo menos um dos {{peersWithLabels}}',
    xor: 'contém um conflito entre pares exclusivos {{peersWithLabels}}',
    or: 'deve conter pelo menos um dos {{peersWithLabels}}',
    and: 'contém {{presentWithLabels}} sem os seus pares necessários {{missingWithLabels}}',
    nand: '!!"{{mainWithLabel}}" não deve existir simultaneamente com {{peersWithLabels}}',
    assert: '!!"{{ref}}" validação falhou porque "{{ref}}" falhou para {{mensagem}}',
    rename: {
      multiple: 'não pôde renomear {{from}} pois muitas renomeaçãoes estão desativadas e já havia sido renomeado para {{to}}',
      override: 'não pôde renomear {{from}} pois sobrescrever está desabilitado e {{to}} já existe',
      regex: {
        multiple: 'não é possível renomear os filhos {{from}} porque várias renomeações estão desativadas e outra chave já foi renomeada para "{{to}}"',
        override: 'não pode renomear os filhos {{from}} porque a substituição está desabilitada e o alvo "{{to}}" existe'
      }
    },
    type: 'deve ser um instância de {{type}}',
    schema: 'deve ser uma instância Joi'
  },
  number: {
    base: 'deve ser um número',
    min: 'deve ser maior ou igual a {{limit}}',
    max: 'deve ser menor ou igual a {{limit}}',
    less: 'deve ser menor que {{limit}}',
    greater: 'deve ser maior que {{limit}}',
    float: 'deve ser um número decimal',
    integer: 'deve ser um número inteiro',
    negative: 'deve ser um número negativo',
    positive: 'deve ser um número positivo',
    precision: 'não pode conter mais que {{limit}} casas decimais',
    ref: 'referencia a {{ref}} na qual não é um número',
    multiple: 'deve ser múltiplo de {{multiple}}'
  },
  string: {
    base: 'deve ser um texto',
    min: 'deve conter no mínimo {{limit}} caracteres',
    max: 'deve conter no máximo {{limit}} caracteres',
    length: 'deve conter {{limit}} caracteres',
    alphanum: 'deve conter apenas caracteres alpha-numéricos',
    token: 'deve conter apenas caracteres alpha-numéricos ou underscore "_"',
    regex: {
      base: 'com o valor "{{!value}}" falha ao comparar ao padrão: {{pattern}}',
      name: 'com o valor "{{!value}}" não corresponde ao padrão {{name}}',
      invert: {
        base: 'com valor "{{!value}}" corresponde ao padrão invertido: {{pattern}}',
        name: 'com valor "{{!value}}" corresponde ao padrão {{name}} invertido'
      }
    },
    email: 'deve ser um email válido',
    emailExists: '"{{email}}" já existe',
    uri: 'dever ser uma URI válida',
    uriRelativeOnly: 'dever ser uma URI relativa válida',
    uriCustomScheme: 'dever ser uma URI válida que se assemelhe ao padrão {{scheme}}',
    isoDate: 'deve ser uma data no padrão ISO 8601',
    guid: 'deve ser um GUID válido',
    hex: 'deve conter apenas valores hexadecimais',
    base64: 'deve ser uma string base64 válida',
    hostname: 'deve conter apenas hostname válido',
    normalize: 'deve ser unicode normalizado no formulário {{form}}',
    lowercase: 'deve conter apenas caracteres em caixa baixa',
    uppercase: 'deve conter apenas caracteres em caixa alta',
    trim: 'não deve haver espaços em branco',
    creditCard: 'deve ser um cartão de crédito',
    ref: 'referencia a {{ref}} que não é um número',
    ip: 'deve ser um IP válido com o CIDR {{cidr}}',
    ipVersion: 'deve ser um IP válido nas versões {{version}} com o CIDR {{cidr}}'
  }
}
