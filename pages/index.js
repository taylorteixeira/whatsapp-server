import Head from "next/head"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  FaWhatsapp,
  FaRobot,
  FaChartLine,
  FaHeadset,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa"

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      name: "Básico",
      price: "R$ 297",
      period: "/mês",
      features: [
        "1 Agente de IA",
        "Atendimento 24/7",
        "Agendamentos automáticos",
        "Respostas personalizadas",
        "Integração com WhatsApp",
      ],
      popular: false,
    },
    {
      name: "Profissional",
      price: "R$ 597",
      period: "/mês",
      features: [
        "3 Agentes de IA",
        "Atendimento 24/7",
        "Agendamentos automáticos",
        "Respostas personalizadas",
        "Integração com WhatsApp",
        "Relatórios de atendimento",
        "Treinamento personalizado",
      ],
      popular: true,
    },
    {
      name: "Empresarial",
      price: "Sob consulta",
      period: "",
      features: [
        "Agentes ilimitados",
        "Atendimento 24/7",
        "Agendamentos automáticos",
        "Respostas personalizadas",
        "Integração com WhatsApp",
        "Relatórios avançados",
        "Treinamento personalizado",
        "Suporte prioritário",
        "API personalizada",
      ],
      popular: false,
    },
  ]

  const handlePlanClick = (plan) => {
    const message = `Olá! Gostaria de saber mais sobre o plano ${plan.name} de agentes de IA para WhatsApp.`
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=5548920027294&text=${encodeURIComponent(
      message
    )}&type=phone_number&app_absent=0`
    window.open(whatsappUrl, "_blank")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Agentes de IA para WhatsApp - Automatize seu Atendimento</title>
        <meta
          name="description"
          content="Automatize seu atendimento com agentes de IA para WhatsApp. Aumente suas vendas e melhore o suporte ao cliente."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaRobot className="text-primary-600 text-3xl mr-2" />
            <span className="text-xl font-bold text-gray-900">WhatsAppIA</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Recursos
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Planos
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Contato
            </a>
          </div>
          <button className="btn-primary hidden md:block">
            <a
              href="#pricing"
            >
              Começar agora
            </a>
          </button>
          <button className="md:hidden text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="section pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="container-custom">
            <motion.div
              className="flex flex-col md:flex-row items-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="md:w-1/2 mb-12 md:mb-0" variants={fadeIn}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Automatize seu Atendimento com
                  <span className="text-primary-600"> Agentes de IA</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Transforme seu WhatsApp em um assistente inteligente 24/7 para
                  agendamentos, vendas e suporte ao cliente.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    className="btn-primary flex items-center justify-center"
                    onClick={() => handlePlanClick({ name: "Demonstração" })}
                  >
                    <span>Agendar Demonstração</span>
                    <FaArrowRight className="ml-2" />
                  </button>
                  <button className="btn-outline flex items-center justify-center">
                    <span>Saiba Mais</span>
                  </button>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-gray-600">
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="ml-4 text-sm text-gray-600">
                    <span className="font-semibold">+500 empresas</span> já
                    utilizam nossa solução
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="md:w-1/2 flex justify-center"
                variants={fadeIn}
                animate={{ y: [0, -20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary-200 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-50"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl max-w-md">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <FaWhatsapp className="text-primary-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          WhatsAppIA
                        </h3>
                        <p className="text-sm text-gray-500">
                          Assistente Virtual
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-800">
                        Olá! Como posso ajudar você hoje?
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 text-sm">1</span>
                        </div>
                        <span className="text-gray-700">Agendar consulta</span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 text-sm">2</span>
                        </div>
                        <span className="text-gray-700">
                          Informações sobre produtos
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 text-sm">3</span>
                        </div>
                        <span className="text-gray-700">Suporte técnico</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section bg-white">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Recursos Poderosos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nossos agentes de IA são projetados para transformar
                completamente seu atendimento ao cliente
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div className="card p-8" variants={fadeIn}>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <FaRobot className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  IA Avançada
                </h3>
                <p className="text-gray-600">
                  Respostas inteligentes e personalizadas para cada cliente,
                  aprendendo com cada interação.
                </p>
              </motion.div>

              <motion.div className="card p-8" variants={fadeIn}>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <FaHeadset className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Atendimento 24/7
                </h3>
                <p className="text-gray-600">
                  Seus clientes recebem atendimento instantâneo a qualquer hora
                  do dia ou da noite.
                </p>
              </motion.div>

              <motion.div className="card p-8" variants={fadeIn}>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <FaChartLine className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Relatórios Detalhados
                </h3>
                <p className="text-gray-600">
                  Acompanhe métricas e desempenho do atendimento para otimizar
                  sua estratégia.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section bg-gray-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Planos que Cabem no seu Bolso
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Escolha o plano ideal para o seu negócio e comece a automatizar
                seu atendimento hoje mesmo
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  className={`card relative ${
                    plan.popular ? "border-2 border-primary-500" : ""
                  }`}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                      Mais Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <FaCheck className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full ${
                        plan.popular ? "btn-primary" : "btn-outline"
                      }`}
                      onClick={() => handlePlanClick(plan)}
                    >
                      Falar com Consultor
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="section bg-primary-600 text-white">
          <div className="container-custom">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comece a Automatizar Hoje
              </h2>
              <p className="text-xl mb-8 text-primary-100">
                Agende uma demonstração gratuita e descubra como nossos agentes
                podem transformar seu atendimento
              </p>
              <button
                className="btn bg-white text-primary-600 hover:bg-gray-100"
                onClick={() => handlePlanClick({ name: "Demonstração" })}
              >
                Agendar Demonstração
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaRobot className="text-primary-500 text-2xl mr-2" />
                <span className="text-xl font-bold text-white">WhatsAppIA</span>
              </div>
              <p className="text-gray-400">
                Automatize seu atendimento com agentes de IA para WhatsApp.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 WhatsAppIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
