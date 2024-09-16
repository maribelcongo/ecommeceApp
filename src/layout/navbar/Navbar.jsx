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
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Icon,
} from "@mui/material";
import {
	ShoppingCart,
	Person,
	Menu as MenuIcon,
	Delete,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/encantadaLogo.jpg";
import "./navbar.css";
import RegisterForm from "../../components/admin/RegisterForm";

const Navbar = () => {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [openCart, setOpenCart] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const { cart, removeFromCart } = useCart();

	const handleMenuOpen = (event) => setAnchorElMenu(event.currentTarget);
	const handleMenuClose = () => setAnchorElMenu(null);
	const handleUserMenuOpen = (event) => setAnchorElUser(event.currentTarget);
	const handleUserMenuClose = () => setAnchorElUser(null);
	const handleCartOpen = () => setOpenCart(true);
	const handleCartClose = () => setOpenCart(false);
	const handleLoginOpen = () => setOpenLogin(true);
	const handleLoginClose = () => setOpenLogin(false);
	const handleRegisterOpen = () => setOpenRegister(true);
	const handleRegisterClose = () => setOpenRegister(false);

	const cartTotal = cart.reduce(
		(acc, item) => acc + Number(item.price) * Number(item.quantity),
		0
	);
	const cartItemsCount = cart.reduce(
		(acc, item) => acc + Number(item.quantity),
		0
	);

	return (
		<AppBar position="static" sx={{ backgroundColor: "#333" }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					height: 130,
					background: "#fff",
				}}
			>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2, color: "#c55e82" }}
					onClick={handleMenuOpen}
				>
					<MenuIcon sx={{ fontSize: 30 }} />
				</IconButton>

				<Typography component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
					<img src={logo} alt="Logo" style={{ height: 85 }} />
				</Typography>

				<IconButton
					color="inherit"
					sx={{ color: "#c55e82" }}
					onClick={handleCartOpen}
				>
					<Badge
						badgeContent={cartItemsCount}
						color="error"
						sx={{ "& .MuiBadge-dot": { backgroundColor: "#ff5722" } }}
					>
						<ShoppingCart sx={{ fontSize: 30 }} />
					</Badge>
				</IconButton>

				<IconButton
					edge="end"
					color="inherit"
					aria-label="user"
					sx={{ color: "#c55e82" }}
					onClick={handleUserMenuOpen}
				>
					<Person sx={{ fontSize: 30 }} />
				</IconButton>

				{/* Menú de usuario */}
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

			{/* Menú de hamburguesa */}
			<Menu
				anchorEl={anchorElMenu}
				open={Boolean(anchorElMenu)}
				onClose={handleMenuClose}
			>
				<MenuItem>
					<Typography variant="h6">Nuestros Productos</Typography>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link to="/" style={{ textDecoration: "none", color: "#333" }}>
						Inicio
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link to="/todos" style={{ textDecoration: "none", color: "#333" }}>
						Todos
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/carteras"
						style={{ textDecoration: "none", color: "#333" }}
					>
						Carteras
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/mochilas"
						style={{ textDecoration: "none", color: "#333" }}
					>
						Mochilas
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/billeteras"
						style={{ textDecoration: "none", color: "#333" }}
					>
						Billeteras
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/riñoneras"
						style={{ textDecoration: "none", color: "#333" }}
					>
						Riñoneras
					</Link>
				</MenuItem>
			</Menu>

			{/* Modal de carrito */}
			<Dialog open={openCart} onClose={handleCartClose} className="cart-dialog">
				<DialogTitle>Carrito de Compras</DialogTitle>
				<DialogContent>
					<Typography variant="h6">
						Productos en el carrito: {cartItemsCount}
					</Typography>
					{cart.map((item) => (
						<div key={item.id} className="cart-item">
							<Typography variant="body1">
								{item.name} - ${item.price} x {item.quantity}
							</Typography>
							<IconButton
								onClick={() => removeFromCart(item.id)}
								aria-label="remove from cart"
							>
								<Delete />
							</IconButton>
						</div>
					))}
					<Typography variant="h6" sx={{ marginTop: 2 }}>
						Total: ${cartTotal.toFixed(2)}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCartClose} color="primary">
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>

			{/* Modal de registro */}
			<Dialog open={openRegister} onClose={handleRegisterClose}>
				<DialogTitle>Registro</DialogTitle>
				<DialogContent>
					<RegisterForm />
					{/* Formulario de registro */}
				</DialogContent>
			</Dialog>
		</AppBar>
	);
};

export default Navbar;
