import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Badge,
	Menu,
	MenuItem,
	Divider,
} from "@mui/material";
import { ShoppingCart, Person, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../assets/encantadaLogo.jpg";

const Navbar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const isMenuOpen = Boolean(anchorEl);

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
				{/* Menu Button */}
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={handleMenuOpen}
					sx={{ mr: 2, color: "#c55e82" }}
				>
					<MenuIcon sx={{ fontSize: 30 }} />
				</IconButton>

				{/* Logo in the center */}
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

				{/* Cart Icon */}
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

				{/* User Icon */}
				<IconButton
					edge="end"
					color="inherit"
					aria-label="user"
					onClick={handleMenuOpen}
					sx={{ color: "#c55e82" }}
				>
					<Person sx={{ fontSize: 30 }} />
				</IconButton>

				{/* User Menu */}
				<Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
					<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
					<MenuItem onClick={handleMenuClose}>My account</MenuItem>
					<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
				</Menu>
			</Toolbar>

			{/* Products Menu */}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleMenuClose}>
					<Typography variant="h6">Productos</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/carteras"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Carteras
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/mochilas"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Mochilas
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/billeteras"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Billeteras
					</Link>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Link
						to="/riñoneras"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Riñoneras
					</Link>
				</MenuItem>
			</Menu>
		</AppBar>
	);
};

export default Navbar;
