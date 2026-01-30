'use client';

import { useEffect, useState } from 'react';

const customStyles = {
	root: {
		backgroundColor: '#EAEBF0',
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
		color: '#1A1A1A',
		lineHeight: '1.4',
		WebkitFontSmoothing: 'antialiased',
	},
	container: {
		width: '100%',
		maxWidth: '1200px',
		padding: '40px',
		display: 'flex',
		flexDirection: 'column',
		gap: '60px',
	},
};

const NavPill = ({
	items,
	activeIndex,
	onItemClick,
}: {
	items: string[];
	activeIndex: number;
	onItemClick: (index: number) => void;
}) => {
	return (
		<div
			style={{
				background: '#FFFFFF',
				padding: '6px',
				borderRadius: '999px',
				display: 'inline-flex',
				gap: '4px',
				boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
			}}
		>
			{items.map((item, index) => (
				<div
					key={index}
					onClick={() => onItemClick(index)}
					style={{
						padding: '10px 24px',
						borderRadius: '999px',
						fontSize: '15px',
						fontWeight: '600',
						color: activeIndex === index ? '#FFF' : '#8E8E93',
						backgroundColor: activeIndex === index ? '#1A1A1A' : 'transparent',
						boxShadow:
							activeIndex === index ? '0 4px 10px rgba(0,0,0,0.2)' : 'none',
						cursor: 'pointer',
						transition: 'all 0.3s ease',
					}}
				>
					{item}
				</div>
			))}
		</div>
	);
};

const StatusBadge = ({ text }: { text: string }) => {
	return (
		<div
			style={{
				background: '#F2F2F7',
				padding: '6px 12px',
				borderRadius: '999px',
				fontSize: '12px',
				fontWeight: '600',
				color: '#1A1A1A',
				display: 'flex',
				alignItems: 'center',
				gap: '6px',
				width: 'fit-content',
			}}
		>
			<div
				style={{
					width: '8px',
					height: '8px',
					backgroundColor: '#34C759',
					borderRadius: '50%',
				}}
			></div>
			<span>{text}</span>
		</div>
	);
};

const ActionButton = ({ onClick }: { onClick: () => void }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				backgroundColor: '#000000',
				color: 'white',
				width: '64px',
				height: '64px',
				borderRadius: '50%',
				border: 'none',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
				transform: isHovered ? 'scale(1.05)' : 'scale(1)',
				transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				marginTop: '32px',
			}}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				style={{ width: '28px', height: '28px' }}
			>
				<path
					d="M12 4v16m0 0l-6-6m6 6l6-6"
					stroke="white"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
			</svg>
		</button>
	);
};

const CommandRow = ({
	desc,
	descSuffix,
	code,
}: {
	desc: string;
	descSuffix: string;
	code: string;
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				background: isHovered ? '#FFF' : '#F9F9FB',
				padding: '20px 24px',
				borderRadius: '24px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				transform: isHovered ? 'scale(1.01)' : 'scale(1)',
				boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
				transition: 'all 0.2s ease',
			}}
		>
			<div style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>
				{desc}{' '}
				<span
					style={{ color: '#8E8E93', fontWeight: '400', marginLeft: '4px' }}
				>
					{descSuffix}
				</span>
			</div>
			<div
				style={{
					fontFamily: '"SF Mono", "Menlo", monospace',
					fontSize: '15px',
					color: '#1A1A1A',
					fontWeight: '500',
				}}
			>
				{code}
			</div>
		</div>
	);
};

const TerminalCard = () => {
	const commands = [
		{ desc: 'Init', descSuffix: '/ Setup', code: 'wordsail init' },
		{
			desc: 'Server',
			descSuffix: '/ Provision',
			code: 'wordsail server provision',
		},
		{ desc: 'Site', descSuffix: '/ Create', code: 'wordsail site create' },
		{ desc: 'Domain', descSuffix: '/ SSL', code: 'wordsail domain add --ssl' },
	];

	return (
		<div
			style={{
				background: '#FFFFFF',
				borderRadius: '32px',
				padding: '32px',
				boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
				position: 'relative',
				overflow: 'hidden',
				minHeight: '400px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '32px',
				}}
			>
				<span
					style={{
						fontSize: '14px',
						fontWeight: '600',
						color: '#8E8E93',
						textTransform: 'uppercase',
						letterSpacing: '0.5px',
					}}
				>
					Session / ACTIVE
				</span>
				<span
					style={{
						fontSize: '14px',
						fontWeight: '600',
						color: '#8E8E93',
						textTransform: 'uppercase',
						letterSpacing: '0.5px',
						opacity: '0.5',
					}}
				>
					Bash
				</span>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				{commands.map((cmd, index) => (
					<CommandRow key={index} {...cmd} />
				))}
			</div>
		</div>
	);
};

const FeatureCard = ({
	icon,
	title,
	description,
	hasProgress,
	progressValue,
}: {
	icon: React.ReactNode;
	title: string;
	description?: string;
	hasProgress?: boolean;
	progressValue?: string;
}) => {
	return (
		<div
			style={{
				background: '#FFFFFF',
				borderRadius: '24px',
				padding: '24px',
				minHeight: '180px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
				position: 'relative',
			}}
		>
			<div
				style={{
					width: '40px',
					height: '40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				{icon}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
				{hasProgress ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<h3
							style={{
								fontSize: '20px',
								fontWeight: '600',
								marginBottom: '8px',
							}}
						>
							{title}
						</h3>
						<span style={{ fontFamily: 'monospace', fontSize: '16px' }}>
							{progressValue}
						</span>
					</div>
				) : (
					<h3
						style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}
					>
						{title}
					</h3>
				)}
				{hasProgress ? (
					<div
						style={{
							marginTop: '12px',
							background: '#F2F2F7',
							height: '6px',
							borderRadius: '99px',
							width: '100%',
							position: 'relative',
						}}
					>
						<div
							style={{
								background: '#1A1A1A',
								width: '50%',
								height: '100%',
								borderRadius: '99px',
								position: 'absolute',
							}}
						></div>
						<div
							style={{
								width: '20px',
								height: '20px',
								background: '#FFF',
								border: '3px solid #1A1A1A',
								borderRadius: '50%',
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
							}}
						></div>
					</div>
				) : (
					<p
						style={{
							fontSize: '14px',
							color: '#8E8E93',
							fontWeight: '500',
							maxWidth: '100%',
						}}
					>
						{description}
					</p>
				)}
			</div>
		</div>
	);
};

export default function HomePage() {
	const [activeNavIndex, setActiveNavIndex] = useState(0);
	const [activeModeIndex, setActiveModeIndex] = useState(0);
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      @media (max-width: 900px) {
        .hero-section {
          grid-template-columns: 1fr !important;
        }
        .feature-grid {
          grid-template-columns: 1fr !important;
        }
        h1 {
          font-size: 48px !important;
        }
      }
    `;
		document.head.appendChild(style);
		return () => document.head.removeChild(style);
	}, []);

	const handleDownload = () => {
		console.log('Download clicked');
	};

	const handleNavClick = (index: number) => {
		setActiveNavIndex(index);
		if (index === 1) {
			// Docs
			window.open(
				'https://github.com/shariffff/wordsail/tree/main/docs',
				'_blank',
			);
		} else if (index === 2) {
			// GitHub
			window.open('https://github.com/shariffff/wordsail', '_blank');
		}
	};

	return (
		<div style={customStyles.root as React.CSSProperties}>
			<div style={customStyles.container as React.CSSProperties}>
				<nav
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							fontWeight: '700',
							fontSize: '24px',
							letterSpacing: '-1px',
						}}
					>
						WordSail
					</div>
					<NavPill
						items={['CLI', 'Docs', 'GitHub']}
						activeIndex={activeNavIndex}
						onItemClick={handleNavClick}
					/>
				</nav>

				<div
					className="hero-section"
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '40px',
						alignItems: 'center',
						marginTop: '40px',
					}}
				>
					<div style={{ paddingRight: '40px' }}>
						<div style={{ marginBottom: '24px' }}>
							<StatusBadge text="v0.0.2 beta" />
						</div>

						<h1
							style={{
								fontSize: '84px',
								fontWeight: '700',
								letterSpacing: '-2px',
								lineHeight: '0.95',
								marginBottom: '24px',
								color: '#1A1A1A',
							}}
						>
							Ship WordPress
							<br />
							at lightspeed.
						</h1>

						<p
							style={{
								fontSize: '18px',
								color: '#8E8E93',
								fontWeight: '500',
								maxWidth: '500px',
								marginBottom: '32px',
							}}
						>
							A frictionless CLI for provisioning rock-solid LEMP stacks.
							Powered by Ansible, designed for automation.
						</p>

						<div style={{ marginBottom: '24px' }}>
							<NavPill
								items={['Interactive', 'Scripting', 'AI Agent']}
								activeIndex={activeModeIndex}
								onItemClick={setActiveModeIndex}
							/>
						</div>

						<div
							onClick={() =>
								copyToClipboard(
									'curl -fsSL https://cli.wordsail.com/install.sh | bash',
								)
							}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								background: '#FFFFFF',
								border: '2px solid #F2F2F7',
								borderRadius: '16px',
								padding: '16px 20px',
								cursor: 'pointer',
								transition: 'all 0.2s ease',
								maxWidth: '600px',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor = '#1A1A1A';
								e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.borderColor = '#F2F2F7';
								e.currentTarget.style.boxShadow = 'none';
							}}
						>
							<div
								style={{
									fontSize: '14px',
									color: '#1A1A1A',
									fontWeight: '600',
									flex: 1,
								}}
							>
								<span style={{ color: '#8E8E93', marginRight: '8px' }}>$</span>
								curl -fsSL https://cli.wordsail.com/install.sh | bash
							</div>
							<div style={{ marginLeft: '16px', flexShrink: 0 }}>
								{isCopied ? (
									<svg
										viewBox="0 0 24 24"
										style={{
											width: '20px',
											height: '20px',
											stroke: '#34C759',
											strokeWidth: '2.5',
											fill: 'none',
										}}
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								) : (
									<svg
										viewBox="0 0 24 24"
										style={{
											width: '20px',
											height: '20px',
											stroke: '#8E8E93',
											strokeWidth: '2',
											fill: 'none',
										}}
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect
											x="9"
											y="9"
											width="13"
											height="13"
											rx="2"
											ry="2"
										></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								)}
							</div>
						</div>
					</div>

					<TerminalCard />
				</div>

				<div
					className="feature-grid"
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '24px',
					}}
				>
					<FeatureCard
						icon={
							<svg
								viewBox="0 0 24 24"
								style={{
									width: '24px',
									height: '24px',
									stroke: '#1A1A1A',
									strokeWidth: '2',
									fill: 'none',
								}}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
								<polyline points="14 2 14 8 20 8"></polyline>
								<line x1="16" y1="13" x2="8" y2="13"></line>
								<line x1="16" y1="17" x2="8" y2="17"></line>
								<polyline points="10 9 9 9 8 9"></polyline>
							</svg>
						}
						title="Ansible Core"
						description="Steps are fully configurable yaml playbooks."
					/>

					<FeatureCard
						icon={
							<svg
								viewBox="0 0 24 24"
								style={{
									width: '24px',
									height: '24px',
									stroke: '#1A1A1A',
									strokeWidth: '2',
									fill: 'none',
								}}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
						}
						title="Speed"
						hasProgress={true}
						progressValue="50ms"
					/>

					<FeatureCard
						icon={
							<svg
								viewBox="0 0 24 24"
								style={{
									width: '24px',
									height: '24px',
									stroke: '#1A1A1A',
									strokeWidth: '2',
									fill: 'none',
								}}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
								<line x1="8" y1="21" x2="16" y2="21"></line>
								<line x1="12" y1="17" x2="12" y2="21"></line>
							</svg>
						}
						title="Non-Interactive"
						description="Headless mode for scripting."
					/>
				</div>

				<footer
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingTop: '40px',
						borderTop: '1px solid rgba(0,0,0,0.05)',
					}}
				>
					<div
						style={{
							fontSize: '14px',
							fontWeight: '600',
							color: '#1A1A1A',
							textTransform: 'none',
							letterSpacing: '0.5px',
						}}
					>
						WordSail
					</div>
					<div style={{ display: 'flex', gap: '24px' }}>
						<a
							href="https://github.com/shariffff/wordsail/tree/main/docs"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								fontSize: '14px',
								color: '#8E8E93',
								fontWeight: '500',
								textDecoration: 'none',
							}}
						>
							Documentation
						</a>
						<a
							href="https://github.com/shariffff/wordsail"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								fontSize: '14px',
								color: '#8E8E93',
								fontWeight: '500',
								textDecoration: 'none',
							}}
						>
							Github
						</a>
					</div>
				</footer>
			</div>
		</div>
	);
}
