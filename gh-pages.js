import {
	publish
} from 'gh-pages';

publish(
	'build', // path to public directory
	{
		branch: 'release',
		repo: 'https://github.com/connorbo97/fe3h-git-pages.git', // Update to point to your repository
		user: {
			name: 'Connor Borden', // update to use your name
			email: 'connorbo97@gmail.com' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);