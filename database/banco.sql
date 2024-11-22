-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/11/2024 às 00:59
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `teste`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `card`
--

CREATE TABLE `card` (
  `id` varchar(36) NOT NULL,
  `painelId` varchar(36) NOT NULL,
  `curso` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `card`
--

INSERT INTO `card` (`id`, `painelId`, `curso`) VALUES
('70a71666-a864-11ef-be51-648214a91c11', '7054e2e0-a864-11ef-be51-648214a91c11', 'Engenharia'),
('70a718bf-a864-11ef-be51-648214a91c11', '7054e3e7-a864-11ef-be51-648214a91c11', 'Medicina'),
('70a7196f-a864-11ef-be51-648214a91c11', '7054e441-a864-11ef-be51-648214a91c11', 'Direito'),
('70a719c7-a864-11ef-be51-648214a91c11', '7054e464-a864-11ef-be51-648214a91c11', 'Administração'),
('70a71a20-a864-11ef-be51-648214a91c11', '7054e47c-a864-11ef-be51-648214a91c11', 'Arquitetura');

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `id` varchar(36) NOT NULL,
  `cardId` varchar(36) NOT NULL,
  `disciplina` varchar(255) NOT NULL,
  `professor` varchar(255) NOT NULL,
  `sala` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplina`
--

INSERT INTO `disciplina` (`id`, `cardId`, `disciplina`, `professor`, `sala`) VALUES
('70abad73-a864-11ef-be51-648214a91c11', '70a71666-a864-11ef-be51-648214a91c11', 'Cálculo 1', 'Prof. Silva', 'Sala 101'),
('70abb006-a864-11ef-be51-648214a91c11', '70a71666-a864-11ef-be51-648214a91c11', 'Física 1', 'Prof. Almeida', 'Sala 102'),
('70abb0d4-a864-11ef-be51-648214a91c11', '70a71666-a864-11ef-be51-648214a91c11', 'Programação', 'Prof. Costa', 'Sala 103'),
('70abb12e-a864-11ef-be51-648214a91c11', '70a718bf-a864-11ef-be51-648214a91c11', 'Anatomia', 'Prof. Souza', 'Sala 201'),
('70abb199-a864-11ef-be51-648214a91c11', '70a718bf-a864-11ef-be51-648214a91c11', 'Fisiologia', 'Prof. Lima', 'Sala 202'),
('70abb223-a864-11ef-be51-648214a91c11', '70a718bf-a864-11ef-be51-648214a91c11', 'Bioquímica', 'Prof. Santos', 'Sala 203'),
('70abb289-a864-11ef-be51-648214a91c11', '70a7196f-a864-11ef-be51-648214a91c11', 'Direito Penal', 'Prof. Mendes', 'Sala 301'),
('70abb330-a864-11ef-be51-648214a91c11', '70a7196f-a864-11ef-be51-648214a91c11', 'Direito Civil', 'Prof. Castro', 'Sala 302'),
('70ac1d10-a864-11ef-be51-648214a91c11', '70a7196f-a864-11ef-be51-648214a91c11', 'Constitucional', 'Prof. Teixeira', 'Sala 303'),
('70ac1f07-a864-11ef-be51-648214a91c11', '70a719c7-a864-11ef-be51-648214a91c11', 'Marketing', 'Prof. Borges', 'Sala 401'),
('70ac1fb2-a864-11ef-be51-648214a91c11', '70a719c7-a864-11ef-be51-648214a91c11', 'Contabilidade', 'Prof. Ramos', 'Sala 402'),
('70ac2044-a864-11ef-be51-648214a91c11', '70a719c7-a864-11ef-be51-648214a91c11', 'Gestão de Pessoas', 'Prof. Nunes', 'Sala 403'),
('70ac20eb-a864-11ef-be51-648214a91c11', '70a71a20-a864-11ef-be51-648214a91c11', 'Desenho Técnico', 'Prof. Carvalho', 'Sala 501'),
('70ac2178-a864-11ef-be51-648214a91c11', '70a71a20-a864-11ef-be51-648214a91c11', 'História da Arte', 'Prof. Araújo', 'Sala 502'),
('70ac2216-a864-11ef-be51-648214a91c11', '70a71a20-a864-11ef-be51-648214a91c11', 'Projeto Arquitetônico', 'Prof. Dias', 'Sala 503');

-- --------------------------------------------------------

--
-- Estrutura para tabela `painel`
--

CREATE TABLE `painel` (
  `id` varchar(36) NOT NULL,
  `statusAluno` enum('CALOURO','VETERANO') NOT NULL,
  `turno` enum('MANHA','TARDE','NOITE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `painel`
--

INSERT INTO `painel` (`id`, `statusAluno`, `turno`) VALUES
('7054e2e0-a864-11ef-be51-648214a91c11', 'CALOURO', 'MANHA'),
('7054e3e7-a864-11ef-be51-648214a91c11', 'VETERANO', 'TARDE'),
('7054e441-a864-11ef-be51-648214a91c11', 'CALOURO', 'NOITE'),
('7054e464-a864-11ef-be51-648214a91c11', 'VETERANO', 'MANHA'),
('7054e47c-a864-11ef-be51-648214a91c11', 'CALOURO', 'TARDE');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `painelId` (`painelId`);

--
-- Índices de tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cardId` (`cardId`);

--
-- Índices de tabela `painel`
--
ALTER TABLE `painel`
  ADD PRIMARY KEY (`id`);

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`painelId`) REFERENCES `painel` (`id`);

--
-- Restrições para tabelas `disciplina`
--
ALTER TABLE `disciplina`
  ADD CONSTRAINT `disciplina_ibfk_1` FOREIGN KEY (`cardId`) REFERENCES `card` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
