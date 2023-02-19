<!-- <svelte:head>

</svelte:head> -->
<script lang="ts">
	var exports = {};
	import { onDestroy, onMount, setContext } from 'svelte';
    import { base } from '$app/paths';

	import {
		CONTEXTS,
		DEFAULT_DICE_OPTIONS,
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT,
		MAX_COMBAT_ARTS,
		MAX_COMBAT_SKILLS,
		MAX_WEAPONS_EQUIPPED
	} from '../constants';
	import Home from './home/home.svelte';
	import Header from './home/header.svelte';
	import { modal } from 'src/stores.js';
	import Modal from 'src/common/Modal.svelte';
	import Xp from './xp/xp.svelte';
	import {
		calculateAllCombatArts,
		calculateAllCombatSkills,
		calculateAllWeapons
	} from 'src/combinationUtils';
	import Editor from './editor/editor.svelte';
	import { SkillProficiency } from 'src/constants/playerSkills';
	import { CLASS } from 'src/constants/classes';
	import DiceEditor from './dice-editor/diceEditor.svelte';
	import SheetManager from './sheet-manager/sheetManager.svelte';

	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		collection,
		onSnapshot,
		query,
		where,
		Timestamp,
		orderBy,
		doc,
		getDoc,
		getDocs
	} from 'firebase/firestore';
	import RollChat from './roll-chat/RollChat.svelte';
	import { getChatMonth } from 'src/rollUtils';

	// TODO: Replace the following with your app's Firebase project configuration
	// See: https://firebase.google.com/docs/web/learn-more#config-object
	const firebaseConfig = {
		apiKey: 'AIzaSyBds7SmknRyVNwc5XTC6TvFzQoR_ACsLTo',
		authDomain: 'fe3h-sheet.firebaseapp.com',
		projectId: 'fe3h-sheet',
		storageBucket: 'fe3h-sheet.appspot.com',
		messagingSenderId: '149307616871',
		appId: '1:149307616871:web:1038f39d161deeb9372ec2'
	};
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const ONE_MINUTE = 1000 * 60;
	const FIVE_MINUTES = ONE_MINUTE * 5;
	const ONE_DAY = ONE_MINUTE * 60 * 24;
	const now = new Date(Date.now() - ONE_DAY);

	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);

	setContext(CONTEXTS.DB, db);

	const defaultSheet: CharacterSheet = {
		playerStats: DEFAULT_PLAYER_STAT,
		playerName: 'No Name',
		playerSkills: DEFAULT_PLAYER_SKILL_PROFICIENCY,
		skillBonuses: DEFAULT_PLAYER_SKILL_BONUSES,
		unlockedClasses: [],
		customWeapons: {},
		customCombatSkills: {},
		customCombatArts: {},
		classXP: {},
		weaponXP: {},
		crest: { type: '', isMajor: false },
		
		equippedClass: '',
		equippedWeapons: [],
		equippedCombatSkills: [],
		equippedCombatArts: [],
	};

	let ready = false;
	let fullSheet: CharacterSheet = defaultSheet;

	let selectedCombatArt: string;
	let selectedWeapon: string;
	let weaponUses: { [s: string]: number } = {};

	let currentPage = 'HOME';

	let curSheet = 'sheet';
	let otherSheetNames: Array<string> = [];
	const baseTime = Date.now();
	let chatEntries: any = [];

	let homeMode = 0;
	$: toggleHomeMode = () => {
		homeMode += 1;
	};

	const q = query(
		collection(db, 'lobby', 'taboola', getChatMonth()),
		where('date', '>', Timestamp.fromDate(now))
	);

	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		const res: Array<any> = [];

		querySnapshot.forEach((doc) => {
			res.push(doc.data());
		});

		chatEntries = res;
		// if (!scrolledToBottom.current) {
		// 	scrolledToBottom.current = true;
		// 	// window.requestAnimationFrame(() => {
		// 	// 	chat.scrollTop = chat.scrollHeight;
		// 	// });
		// }
	});
	onDestroy(() => {
		unsubscribe();
	});

	$: playerStats = fullSheet.playerStats;
	$: playerSkillProficiency = fullSheet.playerSkills;
	$: playerSkillBonus = fullSheet.skillBonuses;
	$: unlockedClasses = fullSheet.unlockedClasses;
	$: name = fullSheet.playerName;
	$: customWeapons = fullSheet.customWeapons;
	$: customCombatSkills = fullSheet.customCombatSkills;
	$: customCombatArts = fullSheet.customCombatArts;
	$: classXP = fullSheet.classXP;
	$: weaponXP = fullSheet.weaponXP;
	$: playerCrest = fullSheet.crest;
	$: equippedClass = fullSheet.equippedClass;
	$: equippedWeapons = fullSheet.equippedWeapons;
	$: equippedCombatSkills = fullSheet.equippedCombatSkills;
	$: equippedCombatArts = fullSheet.equippedCombatArts;

	$: resetEquipped = () => {
		equippedClass = '';
		equippedWeapons = [];
		equippedCombatSkills = [];
		equippedCombatArts = [];

		selectedCombatArt = '';
		selectedWeapon = '';
		weaponUses = {};
	};

	const loadSheet = (sheetName) => {
		try {
			otherSheetNames = JSON.parse(localStorage.getItem('otherSheetNames') || '[]');
		} catch (err) {
			console.log(err);
		}

		const lsSheet = localStorage.getItem(sheetName);

		if (lsSheet) {
			try {
				fullSheet = { ...defaultSheet, ...JSON.parse(lsSheet) };
			} catch (err) {
				console.error(err);
			}
		} else {
			fullSheet = { ...defaultSheet, playerName: sheetName };
		}
	};

	const onChangeCurSheet = (sheetName) => {
		curSheet = sheetName;
		resetEquipped();
		loadSheet(sheetName);
		localStorage.setItem(curSheet, JSON.stringify(fullSheet));
	};

	onMount(() => {
		loadSheet(curSheet);

		ready = true;

		import('@3d-dice/dice-box').then((DiceBox) => {
			let diceBoxOptions;
			try {
				diceBoxOptions = JSON.parse(localStorage.getItem('diceBoxOptions') || '{}');
			} catch (err) {
				console.log(err);
			}
			//@ts-ignore
			const diceBox = new DiceBox.default('#dice-box', {
				...DEFAULT_DICE_OPTIONS,
				...diceBoxOptions
			});
			window.diceBoxContainer = document.getElementById('dice-box');
			diceBox.init().then(() => {
				window.diceBox = diceBox;
			});
			// ...
		});
	});
	$: onChangeSheet = (newSheet: any) => {
		resetEquipped();
		fullSheet = newSheet;
		localStorage.setItem(curSheet, JSON.stringify(newSheet));
	};
	$: onUpdateSheet = (property: string, value: any) => {
		fullSheet = { ...fullSheet, [property]: value };
		localStorage.setItem(curSheet, JSON.stringify(fullSheet));
	};
	$: onUpdatePlayerStats = (newStats: any) => {
		onUpdateSheet('playerStats', newStats);
	};
	$: onUpdatePlayerName = (newName: any) => {
		onUpdateSheet('playerName', newName);
	};
	$: onToggleSkillProficiency = (skill: any) => {
		const curVal = playerSkillProficiency[skill] || SkillProficiency.NONE;
		let newVal;

		if (curVal === SkillProficiency.NONE) {
			newVal = SkillProficiency.PROFICIENT;
		} else if (curVal === SkillProficiency.PROFICIENT) {
			newVal = SkillProficiency.EXPERT;
		} else if (curVal === SkillProficiency.EXPERT) {
			newVal = SkillProficiency.AWFUL;
		} else if (curVal === SkillProficiency.AWFUL) {
			newVal = SkillProficiency.NONE;
		}

		onUpdateSheet('playerSkills', { ...playerSkillProficiency, [skill]: newVal });
	};
	$: setEquippedClass = (newClass: any) => {
		equippedClass = newClass;
		onUpdateSheet('equippedClass', equippedClass);
	};
	$: setSelectedWeapon = (newWeapon: any) => {
		selectedWeapon = newWeapon;
	};
	$: setSelectedCombatArt = (art: any) => {
		selectedCombatArt = art;
	};
	$: onToggleCombatArts = (targetArt: any) => {
		if (equippedCombatArts.indexOf(targetArt) !== -1) {
			equippedCombatArts = equippedCombatArts.filter((art) => art !== targetArt);
		} else if (equippedCombatArts.length < MAX_COMBAT_ARTS) {
			equippedCombatArts = [...equippedCombatArts, targetArt];
		}

		onUpdateSheet('equippedCombatArts', equippedCombatArts);
	};
	$: onToggleCombatSkill = (targetSkill: any) => {
		if (equippedCombatSkills.indexOf(targetSkill) !== -1) {
			equippedCombatSkills = equippedCombatSkills.filter((skill) => skill !== targetSkill);
		} else if (equippedCombatSkills.length < MAX_COMBAT_SKILLS) {
			equippedCombatSkills = [...equippedCombatSkills, targetSkill];
		}

		onUpdateSheet('equippedCombatSkills', equippedCombatSkills);
	};
	$: onToggleEquippedWeapons = (weapon: any) => {
		if (equippedWeapons.includes(weapon)) {
			equippedWeapons = equippedWeapons.filter((w) => w !== weapon);
		} else if (equippedWeapons.length < MAX_WEAPONS_EQUIPPED) {
			equippedWeapons = [...equippedWeapons, weapon];
		}

		onUpdateSheet('equippedWeapons', equippedWeapons);
	};
	$: onUpdateUnlockedClasses = (newClasses: Array<string>) => {
		const classOrder = Object.values(CLASS);
		const a = [...newClasses].sort((a, b) => {
			const aI = classOrder.indexOf(a);
			const bI = classOrder.indexOf(b);
			return aI > bI ? 1 : -1;
		});
		onUpdateSheet('unlockedClasses', a);
	};
	$: onChangePage = (newPage: any) => {
		currentPage = newPage;
	};
	$: onUpdateWeaponXP = (weapon: any, total: any, level: string, mastered: boolean) => {
		onUpdateSheet('weaponXP', { ...weaponXP, [weapon]: { total, level, mastered } });
	};
	$: onUpdateClassXP = (targetClass: any, total: any, mastered: boolean) => {
		onUpdateSheet('classXP', { ...classXP, [targetClass]: { total, mastered } });
	};
	$: onUpdateCrest = (newCrest: PlayerCrest) => {
		onUpdateSheet('crest', newCrest);
	};
	$: onUpdateWeaponUses = (weapon: any, newUses: any) => {
		let finalUses = newUses;
		if (newUses < 0) {
			finalUses = weaponUses[weapon] + newUses;
		}
		finalUses = Math.max(finalUses, 0);

		weaponUses = { ...weaponUses, [weapon]: finalUses };
	};
	$: onUpdateCustomWeapons = (newCustom: any) => {
		onUpdateSheet('customWeapons', newCustom);
	};
	$: onUpdateCustomCombatArts = (newCustom: any) => {
		onUpdateSheet('customCombatArts', newCustom);
	};
	$: onUpdateCustomCombatSkills = (newCustom: any) => {
		onUpdateSheet('customCombatSkills', newCustom);
	};
	$: onAddSheet = (name) => {
		otherSheetNames = [...otherSheetNames, name];
		localStorage.setItem('otherSheetNames', JSON.stringify(otherSheetNames));
		onChangeCurSheet(name);
	};

	$: allWeapons = calculateAllWeapons(fullSheet, equippedClass);
	$: allCombatSkills = calculateAllCombatSkills(fullSheet, equippedClass, equippedCombatSkills, onToggleCombatSkill);
	$: allCombatArts = calculateAllCombatArts(fullSheet, equippedClass, allCombatSkills.fullSet);
	$: masteredClasses = unlockedClasses.filter((c: any) => classXP[c]?.mastered);

	let spoilersOn = Infinity;
	$: toggleSpoilersOn = () => {
		if (spoilersOn === Infinity) {
			spoilersOn = chatEntries.length;
		} else {
			spoilersOn = Infinity;
		}
	};
	let alreadyRevealed = {};
	const setAlreadyRevealed = (i) => {
		alreadyRevealed[i] = true;
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />

	<link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="icon" href="{base}/favicon.jpg" />
	<link
		href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Ibarra+Real+Nova:wght@400;500;700&display=swap&family=Great+Vibes&display=swap"
		rel="stylesheet"
	/>

	<title>{name}</title>
</svelte:head>
<div class={`${ready ? '' : 'no-clicks'} container`}>
	{#if ready}
		<Modal show={$modal}>
			<div id="dice-box">
				<span id="dice-box-result" />
			</div>
			<div class="header">
				<Header
					playerName={name}
					{onUpdatePlayerName}
					{fullSheet}
					{onChangePage}
					{currentPage}
					{homeMode}
					{toggleHomeMode}
					{otherSheetNames}
					{curSheet}
					{onChangeCurSheet}
				/>
			</div>
			<div class="content">
				<div class={currentPage === 'HOME' ? '' : 'invisible'}>
					<Home
						playerName={name}
						{homeMode}
						{allWeapons}
						{allCombatSkills}
						{allCombatArts}
						{playerStats}
						{onUpdatePlayerStats}
						{playerSkillBonus}
						{playerSkillProficiency}
						{onToggleSkillProficiency}
						{equippedWeapons}
						{onToggleEquippedWeapons}
						{equippedCombatArts}
						{onToggleCombatArts}
						{equippedClass}
						{setEquippedClass}
						{equippedCombatSkills}
						{onToggleCombatSkill}
						{unlockedClasses}
						{onUpdateUnlockedClasses}
						{masteredClasses}
						{playerCrest}
						{onUpdateCrest}
						{selectedCombatArt}
						{setSelectedCombatArt}
						{selectedWeapon}
						{setSelectedWeapon}
						{weaponUses}
						{onUpdateWeaponUses}
						{customCombatSkills}
						{onUpdateCustomCombatSkills}
						{customWeapons}
						{onUpdateCustomWeapons}
						{customCombatArts}
						{onUpdateCustomCombatArts}
						{chatEntries}
						{spoilersOn}
						{toggleSpoilersOn}
						{alreadyRevealed}
						{setAlreadyRevealed}
					/>
				</div>
				<div class={currentPage === 'XP' ? '' : 'invisible'}>
					{#if currentPage === 'XP'}
						<Xp
							{unlockedClasses}
							{classXP}
							{weaponXP}
							{onUpdateClassXP}
							{onUpdateWeaponXP}
							{customCombatArts}
							{customCombatSkills}
							{customWeapons}
							{playerSkillProficiency}
							{playerSkillBonus}
							{playerStats}
							playerName={name}
							{onUpdatePlayerStats}
							{onUpdateCustomCombatArts}
							{onUpdateCustomCombatSkills}
							{onUpdateCustomWeapons}
							{equippedClass}
						/>
					{/if}
				</div>
				<div class={currentPage === 'EDITOR' ? '' : 'invisible'}>
					{#if currentPage === 'EDITOR'}
						<Editor {fullSheet} {onChangeSheet} />
					{/if}
				</div>
				<div class={currentPage === 'DICE_EDITOR' ? '' : 'invisible'}>
					{#if currentPage === 'DICE_EDITOR'}
						<DiceEditor />
					{/if}
				</div>
				<div class={currentPage === 'OTHER_SHEETS' ? '' : 'invisible'}>
					{#if currentPage === 'OTHER_SHEETS'}
						<SheetManager {onAddSheet} {otherSheetNames} {curSheet} {onChangeCurSheet} />
					{/if}
				</div>
				<div class={currentPage === 'ROLLS' ? '' : 'invisible'}>
					{#if currentPage === 'ROLLS'}
						<RollChat
							{chatEntries}
							{spoilersOn}
							{toggleSpoilersOn}
							{alreadyRevealed}
							{setAlreadyRevealed}
						/>
					{/if}
				</div>
			</div>
		</Modal>
	{/if}
	{#if !ready}
		<div class="not-ready">Loading</div>
	{/if}
</div>

<style lang="scss">
	:global(#dice-canvas) {
        width: calc(100vw - 20px);
        height: calc(100vh - 20px);
    }

    :global(body) {
        font-family: 'Ibarra Real Nova', serif;
        margin: 0;
        button {
            border-radius: 5px;
            border: 1px solid transparent;
            // border: 2px solid rgb(119, 116, 120);
            // border-left: 0;
            // border-top: 0;
            box-shadow: 1px 3px rgba(gray, 0.6);
            padding: 5px;
            &:disabled {
                background-color: #a3a3a3;
            }
        }

        select {
            border-radius: 10px;
            // &:focus-visible {
            // }
        }
    }

	.container {
		display: grid;
		grid-template-areas:
			'header'
			'content';
		grid-template-rows: 50px calc(100vh - 50px);
		grid-template-columns: 1fr;
		background-color: #dfd6c2;

		min-height: 100vh;
	}
	.header {
		grid-area: header;
	}
	.content {
		grid-area: content;
		> div {
			height: 100%;
		}
	}
	.no-clicks {
		pointer-events: none;
	}
	.not-ready {
		position: fixed;
		inset: 0;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.invisible.invisible {
		height: 0;
		width: 0;
		overflow: hidden;
	}

	#dice-box {
		z-index: 1001;
		position: fixed;
		top: 0;
		left: 0;
		height: 0px;
		overflow: visible;
		pointer-events: none;
		background: none !important;
	}
	#dice-box-result {
		background-color: azure;
		border: 2px solid black;
		border-radius: 5px;
		padding: 5px;
		font-size: 30px;
		// opacity: 0;
		position: fixed;
		z-index: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		min-width: 200px;
		min-height: 100px;

		opacity: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
