import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Badge,
	Menu,
	MenuItem,
	Dialog,
} from "@mui/material";
import { ShoppingCart, Person, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import LoginForm from "../../components/admin/LoginForm";
import RegisterForm from "../../components/admin/RegisterForm";
import logo from "../../assets/encantadaLogo.jpg";

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const handleMenuOpen = (event) => {
		setAnchorElMenu(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorElMenu(null);
	};

	const handleUserMenuOpen = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setAnchorElUser(null);
	};

	const handleLoginOpen = () => {
		setOpenLogin(true);
	};

	const handleLoginClose = () => {
		setOpenLogin(false);
	};

	const handleRegisterOpen = () => {
		setOpenRegister(true);
	};

	const handleRegisterClose = () => {
		setOpenRegister(false);
	};

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: "#333",
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					height: 130,
					background: "#fff",
				}}
			>
				{/* Botón de Menú */}
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2, color: "#c55e82" }}
					onClick={handleMenuOpen} // Evento para abrir el menú hamburguesa
				>
					<MenuIcon sx={{ fontSize: 30 }} />
				</IconButton>

				{/* Logo en el centro */}
				<Typography
					component="div"
					sx={{
						flexGrow: 1,
						textAlign: "center",
					}}
				>
					<img
						src={logo}
						alt="Logo"
						style={{
							height: 85,
						}}
					/>
				</Typography>

				{/* Icono del Carrito */}
				<IconButton color="inherit" sx={{ color: "#c55e82" }}>
					<Badge
						badgeContent={4}
						color="error"
						sx={{
							"& .MuiBadge-dot": {
								backgroundColor: "#ff5722",
							},
						}}
					>
						<ShoppingCart sx={{ fontSize: 30 }} />
					</Badge>
				</IconButton>

				{/* Icono del Usuario */}
				<IconButton
					edge="end"
					color="inherit"
					aria-label="user"
					sx={{ color: "#c55e82" }}
					onClick={handleUserMenuOpen} // Evento para abrir el menú de usuario
				>
					<Person sx={{ fontSize: 30 }} />
				</IconButton>

				{/* Menú de Usuario */}
				<Menu
					anchorEl={anchorElUser}
					open={Boolean(anchorElUser)}
					onClose={handleUserMenuClose}
				>
					<MenuItem onClick={handleRegisterOpen}>Registrarse</MenuItem>
					<MenuItem onClick={handleLoginOpen}>Iniciar Sesión</MenuItem>
					<MenuItem onClick={handleUserMenuClose}>Mi cuenta</MenuItem>
					<MenuItem onClick={handleUserMenuClose}>Cerrar Sesión</MenuItem>
				</Menu>
			</Toolbar>

			{/* Menú Hamburguesa */}
			<Menu
				anchorEl={anchorElMenu}
				open={Boolean(anchorElMenu)}
				onClose={handleMenuClose}
			>
				<MenuItem>
					<Typography variant="h6">Productos</Typography>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/todos"
						style={{ textDecoration: "none", color: "#333", cursor: "pointer" }}
					>
						todos
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/carteras"
						style={{ textDecoration: "none", color: "#333", cursor: "pointer" }}
					>
						Carteras
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/mochilas"
						style={{ textDecoration: "none", color: "#333", cursor: "pointer" }}
					>
						Mochilas
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/billeteras"
						style={{ textDecoration: "none", color: "#333", cursor: "pointer" }}
					>
						Billeteras
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/riñoneras"
						style={{ textDecoration: "none", color: "#333", cursor: "pointer" }}
					>
						Riñoneras
					</Link>
				</MenuItem>
			</Menu>

			{/* Diálogo de Iniciar Sesión */}
			<Dialog open={openLogin} onClose={handleLoginClose}>
				<LoginForm onClose={handleLoginClose} />
			</Dialog>

			{/* Diálogo de Registro */}
			<Dialog open={openRegister} onClose={handleRegisterClose}>
				<RegisterForm onClose={handleRegisterClose} />
			</Dialog>
		</AppBar>
	);
};

export default Navbar;
