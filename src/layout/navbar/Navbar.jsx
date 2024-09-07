import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Badge,
	Menu,
	MenuItem,
} from "@mui/material";
import { ShoppingCart, Person, Menu as MenuIcon } from "@mui/icons-material";
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
		</AppBar>
	);
};

export default Navbar;
