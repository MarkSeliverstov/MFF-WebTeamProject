db.auth('root', 'password');
db = db.getSiblingDB('webapp');
db.createUser({
  user: 'test',
  pwd: 'test1234',
  roles: [{ role: 'readWrite', db: 'webapp' }]
});
db.createCollection('webpage_records', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: ['url', 'periodicity', 'regexp', 'label', 'active', 'tags'],
			additionalProperties: false,
			properties: {
				_id: {
					bsonType: 'objectId'
				},
				url: {
					bsonType: 'string',
					description: 'must be a string and is required'
				},
				periodicity: {
					bsonType: 'object',
					required: ['unit', 'interval'],
					additionalProperties: false,
					properties: {
						unit: {
							enum: ['minutes', 'hours', 'days']
						},
						interval: {
							bsonType: 'int',
							minimum: 1
						}
					}
				},
				regexp: {
					bsonType: 'string',
					description: 'must be a string and is required'
				},
				label: {
					bsonType: 'string',
					description: 'must be a string and is required'
				},
				active: {
					bsonType: 'bool',
					description: 'must be a bool and is required'
				},
				tags: {
					bsonType: 'array',
					items: {
						bsonType: 'string'
					}
				}
			}
		}
	}
});

db.webpage_records.insertMany([
	{
		url: 'https://timely-curler.org',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'placeat corporis ad',
		label: 'Langosh, Hansen and Wolf',
		active: false,
		tags: ['illo', 'voluptatum', 'similique']
	},
	{
		url: 'https://empty-t-shirt.biz',
		periodicity: { unit: 'days', interval: 3 },
		regexp: 'quam mollitia laudantium',
		label: 'Blanda - Waelchi',
		active: false,
		tags: ['enim', 'quo', 'saepe']
	},
	{
		url: 'https://important-chart.info/',
		periodicity: { unit: 'hours', interval: 9 },
		regexp: 'deserunt sit quam',
		label: 'Wolf, Pollich and Schaden',
		active: false,
		tags: ['laudantium', 'harum', 'ipsa']
	},
	{
		url: 'https://puzzled-adrenalin.org',
		periodicity: { unit: 'minutes', interval: 8 },
		regexp: 'debitis aliquam esse',
		label: 'Hagenes LLC',
		active: true,
		tags: ['et', 'quasi', 'eaque']
	},
	{
		url: 'https://abandoned-pitching.name',
		periodicity: { unit: 'days', interval: 4 },
		regexp: 'ex quasi sunt',
		label: 'Cassin, Jones and Willms',
		active: true,
		tags: ['cupiditate', 'modi', 'labore']
	},
	{
		url: 'https://better-instrumentalist.com/',
		periodicity: { unit: 'hours', interval: 10 },
		regexp: 'tempora aliquid velit',
		label: 'Emmerich Group',
		active: true,
		tags: ['veniam', 'dolores', 'quisquam']
	},
	{
		url: 'https://babyish-styling.org',
		periodicity: { unit: 'hours', interval: 8 },
		regexp: 'neque beatae doloremque',
		label: 'Senger, Baumbach and Jaskolski',
		active: false,
		tags: ['pariatur', 'sed', 'quibusdam']
	},
	{
		url: 'https://smooth-glory.biz',
		periodicity: { unit: 'days', interval: 1 },
		regexp: 'deleniti impedit labore',
		label: 'Torp, Runte and Hilpert',
		active: false,
		tags: ['possimus', 'molestiae', 'laudantium']
	},
	{
		url: 'https://aching-stamen.info',
		periodicity: { unit: 'hours', interval: 3 },
		regexp: 'labore itaque tenetur',
		label: 'Farrell - Hilll',
		active: true,
		tags: ['nulla', 'eveniet', 'sunt']
	},
	{
		url: 'https://stupendous-calculation.info/',
		periodicity: { unit: 'minutes', interval: 5 },
		regexp: 'autem et nostrum',
		label: 'Grady LLC',
		active: false,
		tags: ['aliquid', 'dicta', 'quas']
	},
	{
		url: 'https://clear-discrimination.net',
		periodicity: { unit: 'hours', interval: 8 },
		regexp: 'nemo pariatur natus',
		label: 'Breitenberg, Bogan and Renner',
		active: true,
		tags: ['quae', 'maiores', 'illum']
	},
	{
		url: 'https://trim-bunch.com',
		periodicity: { unit: 'hours', interval: 8 },
		regexp: 'harum distinctio sunt',
		label: 'Pfeffer LLC',
		active: false,
		tags: ['deserunt', 'minus', 'rerum']
	},
	{
		url: 'https://qualified-resemblance.info',
		periodicity: { unit: 'hours', interval: 7 },
		regexp: 'soluta deleniti praesentium',
		label: 'Gerhold LLC',
		active: false,
		tags: ['officia', 'dicta', 'magnam']
	},
	{
		url: 'https://wooden-succotash.biz',
		periodicity: { unit: 'minutes', interval: 4 },
		regexp: 'quas quam excepturi',
		label: 'Lind, Pouros and Bednar',
		active: false,
		tags: ['omnis', 'beatae', 'molestiae']
	},
	{
		url: 'https://gargantuan-advancement.org/',
		periodicity: { unit: 'minutes', interval: 5 },
		regexp: 'iusto voluptates rem',
		label: 'Stark Inc',
		active: true,
		tags: ['animi', 'cum', 'eaque']
	},
	{
		url: 'https://inexperienced-epauliere.name/',
		periodicity: { unit: 'minutes', interval: 5 },
		regexp: 'eaque impedit quos',
		label: 'VonRueden, Mertz and Herzog',
		active: true,
		tags: ['ratione', 'sit', 'officiis']
	},
	{
		url: 'https://close-ambiguity.biz',
		periodicity: { unit: 'minutes', interval: 5 },
		regexp: 'accusantium unde iusto',
		label: 'Thiel, Berge and Effertz',
		active: true,
		tags: ['porro', 'delectus', 'provident']
	},
	{
		url: 'https://unfortunate-district.org',
		periodicity: { unit: 'minutes', interval: 6 },
		regexp: 'doloribus exercitationem facere',
		label: 'Treutel LLC',
		active: false,
		tags: ['error', 'minima', 'nam']
	},
	{
		url: 'https://spectacular-carotene.org',
		periodicity: { unit: 'minutes', interval: 2 },
		regexp: 'in facere deserunt',
		label: 'Watsica, Glover and Blick',
		active: false,
		tags: ['architecto', 'quibusdam', 'natus']
	},
	{
		url: 'https://forthright-dredger.name/',
		periodicity: { unit: 'minutes', interval: 1 },
		regexp: 'suscipit cum dignissimos',
		label: 'Konopelski and Sons',
		active: true,
		tags: ['asperiores', 'quam', 'reiciendis']
	},
	{
		url: 'https://posh-paint.net/',
		periodicity: { unit: 'hours', interval: 1 },
		regexp: 'ea perferendis harum',
		label: 'Gottlieb - Ruecker',
		active: true,
		tags: ['placeat', 'aut', 'repudiandae']
	},
	{
		url: 'https://beautiful-patty.net',
		periodicity: { unit: 'minutes', interval: 8 },
		regexp: 'aperiam repellat cupiditate',
		label: 'Marquardt, Larkin and Lakin',
		active: true,
		tags: ['molestias', 'excepturi', 'similique']
	},
	{
		url: 'https://gracious-whey.info',
		periodicity: { unit: 'minutes', interval: 10 },
		regexp: 'iste cumque architecto',
		label: 'Cronin Group',
		active: false,
		tags: ['modi', 'delectus', 'ducimus']
	},
	{
		url: 'https://liquid-whirlwind.com/',
		periodicity: { unit: 'minutes', interval: 4 },
		regexp: 'aliquam mollitia vitae',
		label: 'Rath, Kris and Skiles',
		active: true,
		tags: ['consequatur', 'itaque', 'maiores']
	},
	{
		url: 'https://whimsical-jewel.biz/',
		periodicity: { unit: 'hours', interval: 3 },
		regexp: 'quisquam aliquid incidunt',
		label: 'Schuppe Group',
		active: true,
		tags: ['ex', 'reiciendis', 'est']
	},
	{
		url: 'https://disgusting-spectrograph.com',
		periodicity: { unit: 'hours', interval: 8 },
		regexp: 'quo quam quae',
		label: 'Friesen - Hahn',
		active: true,
		tags: ['incidunt', 'id', 'vero']
	},
	{
		url: 'https://regular-zoology.org',
		periodicity: { unit: 'hours', interval: 7 },
		regexp: 'ea eius similique',
		label: 'Heaney and Sons',
		active: false,
		tags: ['amet', 'velit', 'voluptatibus']
	},
	{
		url: 'https://uniform-compassionate.info/',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'quam labore doloribus',
		label: 'Wilderman Group',
		active: true,
		tags: ['unde', 'dicta', 'expedita']
	},
	{
		url: 'https://grand-restriction.com',
		periodicity: { unit: 'days', interval: 4 },
		regexp: 'tempore fuga eos',
		label: 'Cummerata Group',
		active: false,
		tags: ['sapiente', 'inventore', 'possimus']
	},
	{
		url: 'https://critical-immigration.info',
		periodicity: { unit: 'hours', interval: 5 },
		regexp: 'nemo minima quod',
		label: 'Schaden, McLaughlin and Kuhlman',
		active: true,
		tags: ['officia', 'maxime', 'quas']
	},
	{
		url: 'https://nocturnal-adrenaline.com',
		periodicity: { unit: 'minutes', interval: 6 },
		regexp: 'ipsum voluptatibus hic',
		label: 'Monahan - Bergnaum',
		active: false,
		tags: ['repellat', 'incidunt', 'soluta']
	},
	{
		url: 'https://cute-assistance.org',
		periodicity: { unit: 'days', interval: 5 },
		regexp: 'ad exercitationem accusantium',
		label: 'Adams LLC',
		active: false,
		tags: ['quae', 'eveniet', 'exercitationem']
	},
	{
		url: 'https://round-archaeologist.info',
		periodicity: { unit: 'hours', interval: 9 },
		regexp: 'sint debitis necessitatibus',
		label: 'Wisoky, Reichel and Considine',
		active: true,
		tags: ['tenetur', 'possimus', 'id']
	},
	{
		url: 'https://watchful-independent.net/',
		periodicity: { unit: 'minutes', interval: 8 },
		regexp: 'iusto labore qui',
		label: 'Dare - Turcotte',
		active: false,
		tags: ['quod', 'quam', 'nemo']
	},
	{
		url: 'https://courteous-sponge.biz',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'voluptas voluptas consectetur',
		label: 'Wolff, Stehr and Rutherford',
		active: true,
		tags: ['voluptatum', 'laudantium', 'et']
	},
	{
		url: 'https://treasured-fisherman.name/',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'numquam ipsum sequi',
		label: 'Blanda - Tremblay',
		active: true,
		tags: ['vitae', 'veniam', 'autem']
	},
	{
		url: 'https://genuine-dulcimer.biz/',
		periodicity: { unit: 'minutes', interval: 9 },
		regexp: 'ab dolores voluptatibus',
		label: 'Prohaska Group',
		active: true,
		tags: ['sed', 'accusantium', 'quis']
	},
	{
		url: 'https://cavernous-catalysis.name',
		periodicity: { unit: 'days', interval: 9 },
		regexp: 'cupiditate dolor facere',
		label: 'Okuneva and Sons',
		active: true,
		tags: ['vitae', 'alias', 'voluptas']
	},
	{
		url: 'https://courteous-juice.name/',
		periodicity: { unit: 'hours', interval: 1 },
		regexp: 'praesentium molestiae omnis',
		label: 'MacGyver, Altenwerth and Gerlach',
		active: true,
		tags: ['cupiditate', 'quam', 'itaque']
	},
	{
		url: 'https://burdensome-blush.info',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'odit consectetur nihil',
		label: "Murray, O'Hara and Hills",
		active: false,
		tags: ['error', 'iure', 'totam']
	},
	{
		url: 'https://slimy-swimsuit.net',
		periodicity: { unit: 'days', interval: 4 },
		regexp: 'molestiae nulla neque',
		label: 'Jast - Pfeffer',
		active: false,
		tags: ['repellendus', 'accusamus', 'accusantium']
	},
	{
		url: 'https://perfect-rope.com/',
		periodicity: { unit: 'hours', interval: 10 },
		regexp: 'quo illo dolores',
		label: "Kautzer, O'Keefe and Heidenreich",
		active: false,
		tags: ['est', 'adipisci', 'aspernatur']
	},
	{
		url: 'https://indelible-vector.biz/',
		periodicity: { unit: 'minutes', interval: 9 },
		regexp: 'vitae vel corporis',
		label: 'Harvey LLC',
		active: true,
		tags: ['aliquid', 'illum', 'veritatis']
	},
	{
		url: 'https://similar-brace.com/',
		periodicity: { unit: 'minutes', interval: 3 },
		regexp: 'rerum doloremque facere',
		label: 'Bartoletti Group',
		active: true,
		tags: ['dicta', 'debitis', 'placeat']
	},
	{
		url: 'https://weekly-knowledge.info',
		periodicity: { unit: 'hours', interval: 5 },
		regexp: 'beatae facilis odio',
		label: 'Hamill - Lebsack',
		active: false,
		tags: ['saepe', 'laborum', 'recusandae']
	},
	{
		url: 'https://unfinished-silicon.name/',
		periodicity: { unit: 'minutes', interval: 9 },
		regexp: 'deleniti veniam non',
		label: 'Christiansen - Ledner',
		active: false,
		tags: ['ducimus', 'sequi', 'ratione']
	},
	{
		url: 'https://warm-ninja.info/',
		periodicity: { unit: 'hours', interval: 5 },
		regexp: 'aliquid nemo cupiditate',
		label: 'Legros, Bechtelar and Lehner',
		active: true,
		tags: ['necessitatibus', 'facilis', 'earum']
	},
	{
		url: 'https://private-epoxy.net',
		periodicity: { unit: 'hours', interval: 2 },
		regexp: 'quae nostrum autem',
		label: "D'Amore Inc",
		active: false,
		tags: ['dolores', 'quia', 'nobis']
	},
	{
		url: 'https://multicolored-role.info',
		periodicity: { unit: 'days', interval: 2 },
		regexp: 'vitae pariatur repellat',
		label: 'Aufderhar Inc',
		active: false,
		tags: ['pariatur', 'aliquam', 'non']
	},
	{
		url: 'https://frightening-wafer.biz',
		periodicity: { unit: 'days', interval: 3 },
		regexp: 'voluptate maxime distinctio',
		label: 'Bogan Group',
		active: true,
		tags: ['quis', 'quos', 'animi']
	},
	{
		url: 'https://organic-innovation.name',
		periodicity: { unit: 'minutes', interval: 10 },
		regexp: 'ad quo ipsum',
		label: 'Littel - Ullrich',
		active: false,
		tags: ['non', 'minima', 'ducimus']
	},
	{
		url: 'https://excitable-palm.com',
		periodicity: { unit: 'hours', interval: 3 },
		regexp: 'rem provident cumque',
		label: "O'Connell - Towne",
		active: true,
		tags: ['error', 'quas', 'optio']
	},
	{
		url: 'https://hopeful-watcher.name/',
		periodicity: { unit: 'days', interval: 2 },
		regexp: 'tempora explicabo repellat',
		label: 'Cole - Sporer',
		active: false,
		tags: ['asperiores', 'recusandae', 'unde']
	},
	{
		url: 'https://second-shoehorn.info/',
		periodicity: { unit: 'hours', interval: 10 },
		regexp: 'voluptates ratione dicta',
		label: 'Hauck, Orn and Harber',
		active: true,
		tags: ['harum', 'provident', 'quia']
	},
	{
		url: 'https://subdued-perfection.org/',
		periodicity: { unit: 'minutes', interval: 7 },
		regexp: 'hic iste ducimus',
		label: 'Beier - Aufderhar',
		active: true,
		tags: ['ipsum', 'repudiandae', 'dicta']
	},
	{
		url: 'https://cool-proceedings.com/',
		periodicity: { unit: 'minutes', interval: 9 },
		regexp: 'voluptate eos explicabo',
		label: 'Rowe - Deckow',
		active: true,
		tags: ['doloremque', 'voluptatum', 'mollitia']
	},
	{
		url: 'https://glamorous-gloom.com',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'reiciendis ab itaque',
		label: 'Metz, Roberts and Gutmann',
		active: true,
		tags: ['maiores', 'aliquam', 'perspiciatis']
	},
	{
		url: 'https://adored-colony.name',
		periodicity: { unit: 'days', interval: 4 },
		regexp: 'a inventore quisquam',
		label: 'Kohler, Russel and Hettinger',
		active: false,
		tags: ['impedit', 'voluptates', 'corrupti']
	},
	{
		url: 'https://raw-propane.biz/',
		periodicity: { unit: 'hours', interval: 9 },
		regexp: 'non eaque excepturi',
		label: 'Krajcik, Huels and Cummerata',
		active: false,
		tags: ['necessitatibus', 'commodi', 'eius']
	},
	{
		url: 'https://gullible-arrangement.info',
		periodicity: { unit: 'minutes', interval: 1 },
		regexp: 'eius quod adipisci',
		label: 'Balistreri, Huel and Bartell',
		active: true,
		tags: ['ipsum', 'tempora', 'dolor']
	},
	{
		url: 'https://dishonest-pilaf.biz',
		periodicity: { unit: 'minutes', interval: 3 },
		regexp: 'occaecati atque totam',
		label: 'Nienow, Price and Wehner',
		active: false,
		tags: ['in', 'eum', 'officia']
	},
	{
		url: 'https://scientific-beginner.net',
		periodicity: { unit: 'hours', interval: 10 },
		regexp: 'accusamus distinctio iste',
		label: 'Feest, Schinner and Cole',
		active: true,
		tags: ['quis', 'ipsam', 'ipsa']
	},
	{
		url: 'https://physical-expectancy.org/',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'ab praesentium delectus',
		label: 'Langosh, Schuppe and Zboncak',
		active: true,
		tags: ['maiores', 'aliquid', 'quam']
	},
	{
		url: 'https://red-half-brother.name',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'magni quaerat facilis',
		label: 'Littel - Anderson',
		active: true,
		tags: ['accusamus', 'nesciunt', 'eaque']
	},
	{
		url: 'https://terrible-concert.name/',
		periodicity: { unit: 'days', interval: 9 },
		regexp: 'accusamus modi animi',
		label: 'Pouros LLC',
		active: true,
		tags: ['dolore', 'occaecati', 'consequuntur']
	},
	{
		url: 'https://necessary-plan.name/',
		periodicity: { unit: 'minutes', interval: 3 },
		regexp: 'quaerat perspiciatis commodi',
		label: 'Goodwin LLC',
		active: true,
		tags: ['magnam', 'quam', 'id']
	},
	{
		url: 'https://cheerful-luxury.info/',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'molestias nemo esse',
		label: 'Beer LLC',
		active: false,
		tags: ['voluptatum', 'molestiae', 'delectus']
	},
	{
		url: 'https://welcome-wasabi.biz/',
		periodicity: { unit: 'minutes', interval: 8 },
		regexp: 'accusantium culpa voluptate',
		label: 'Wuckert, Deckow and Parisian',
		active: true,
		tags: ['ipsam', 'deserunt', 'in']
	},
	{
		url: 'https://grotesque-senate.biz/',
		periodicity: { unit: 'hours', interval: 7 },
		regexp: 'deleniti mollitia ea',
		label: 'Hartmann and Sons',
		active: true,
		tags: ['explicabo', 'perspiciatis', 'provident']
	},
	{
		url: 'https://entire-kayak.org/',
		periodicity: { unit: 'minutes', interval: 10 },
		regexp: 'veniam atque recusandae',
		label: 'Schneider, Smith and Kris',
		active: false,
		tags: ['recusandae', 'labore', 'laboriosam']
	},
	{
		url: 'https://breakable-bulb.com',
		periodicity: { unit: 'hours', interval: 5 },
		regexp: 'maxime rem reprehenderit',
		label: 'Schneider Group',
		active: true,
		tags: ['eaque', 'repudiandae', 'quisquam']
	},
	{
		url: 'https://both-reamer.org',
		periodicity: { unit: 'minutes', interval: 3 },
		regexp: 'quam ipsa magni',
		label: 'Medhurst, Smitham and Volkman',
		active: false,
		tags: ['nesciunt', 'iusto', 'quae']
	},
	{
		url: 'https://kind-greed.biz',
		periodicity: { unit: 'days', interval: 2 },
		regexp: 'fugiat ad ipsa',
		label: 'Douglas - Lubowitz',
		active: false,
		tags: ['ut', 'impedit', 'labore']
	},
	{
		url: 'https://right-facet.biz',
		periodicity: { unit: 'minutes', interval: 7 },
		regexp: 'reprehenderit sapiente dicta',
		label: 'Stehr Inc',
		active: false,
		tags: ['mollitia', 'incidunt', 'molestiae']
	},
	{
		url: 'https://beloved-brother-in-law.info',
		periodicity: { unit: 'minutes', interval: 4 },
		regexp: 'dolorum eveniet quisquam',
		label: 'Wyman and Sons',
		active: false,
		tags: ['placeat', 'quisquam', 'voluptatibus']
	},
	{
		url: 'https://deserted-day.net',
		periodicity: { unit: 'minutes', interval: 2 },
		regexp: 'assumenda recusandae illum',
		label: 'Satterfield - Hyatt',
		active: false,
		tags: ['facilis', 'veritatis', 'voluptates']
	},
	{
		url: 'https://vigilant-railroad.biz',
		periodicity: { unit: 'hours', interval: 7 },
		regexp: 'distinctio id eveniet',
		label: 'Zemlak, Wunsch and Deckow',
		active: true,
		tags: ['pariatur', 'cumque', 'inventore']
	},
	{
		url: 'https://fabulous-anthropology.org',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'repellat occaecati tenetur',
		label: 'Cole Group',
		active: false,
		tags: ['repellendus', 'veritatis', 'iure']
	},
	{
		url: 'https://other-mixer.com/',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'natus assumenda quae',
		label: 'Abernathy - Goyette',
		active: false,
		tags: ['esse', 'mollitia', 'non']
	},
	{
		url: 'https://lucky-fiction.name',
		periodicity: { unit: 'minutes', interval: 1 },
		regexp: 'officiis quam ipsam',
		label: 'Koelpin, Schuppe and Legros',
		active: true,
		tags: ['iure', 'nemo', 'placeat']
	},
	{
		url: 'https://grave-ship.info',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'autem commodi nam',
		label: 'Gutmann, Green and Schuppe',
		active: false,
		tags: ['odit', 'nesciunt', 'dicta']
	},
	{
		url: 'https://yearly-merit.biz',
		periodicity: { unit: 'days', interval: 1 },
		regexp: 'recusandae sit temporibus',
		label: 'Wintheiser Inc',
		active: true,
		tags: ['esse', 'recusandae', 'itaque']
	},
	{
		url: 'https://noisy-native.net',
		periodicity: { unit: 'hours', interval: 4 },
		regexp: 'dolorem expedita ducimus',
		label: 'Renner LLC',
		active: false,
		tags: ['occaecati', 'aperiam', 'facilis']
	},
	{
		url: 'https://shameful-bite.name',
		periodicity: { unit: 'hours', interval: 4 },
		regexp: 'magni debitis sint',
		label: 'Kris Group',
		active: false,
		tags: ['magnam', 'voluptatem', 'odio']
	},
	{
		url: 'https://made-up-carving.name/',
		periodicity: { unit: 'days', interval: 8 },
		regexp: 'perferendis debitis non',
		label: 'Willms Inc',
		active: true,
		tags: ['molestiae', 'ipsum', 'repellat']
	},
	{
		url: 'https://judicious-prosecutor.biz/',
		periodicity: { unit: 'hours', interval: 2 },
		regexp: 'eius asperiores suscipit',
		label: 'Bosco - Cartwright',
		active: false,
		tags: ['velit', 'saepe', 'incidunt']
	},
	{
		url: 'https://chilly-brass.info/',
		periodicity: { unit: 'hours', interval: 6 },
		regexp: 'provident ab doloribus',
		label: 'Wiza, Cruickshank and Roob',
		active: false,
		tags: ['vitae', 'tenetur', 'occaecati']
	},
	{
		url: 'https://pessimistic-complicity.name',
		periodicity: { unit: 'minutes', interval: 2 },
		regexp: 'repellendus quod ipsum',
		label: 'Rutherford, Keeling and Beer',
		active: false,
		tags: ['suscipit', 'impedit', 'ipsa']
	},
	{
		url: 'https://pushy-hail.com/',
		periodicity: { unit: 'hours', interval: 3 },
		regexp: 'omnis temporibus illum',
		label: 'Sauer - Okuneva',
		active: false,
		tags: ['atque', 'libero', 'quisquam']
	},
	{
		url: 'https://used-disgust.net/',
		periodicity: { unit: 'days', interval: 9 },
		regexp: 'eum facere nihil',
		label: 'Hintz and Sons',
		active: true,
		tags: ['ipsam', 'sequi', 'doloribus']
	},
	{
		url: 'https://fresh-somersault.name',
		periodicity: { unit: 'minutes', interval: 6 },
		regexp: 'veniam blanditiis sit',
		label: 'Dach LLC',
		active: true,
		tags: ['nostrum', 'laudantium', 'amet']
	},
	{
		url: 'https://anxious-condor.info',
		periodicity: { unit: 'days', interval: 3 },
		regexp: 'numquam excepturi ipsum',
		label: 'DuBuque Inc',
		active: true,
		tags: ['eos', 'delectus', 'ut']
	},
	{
		url: 'https://verifiable-past.info',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'unde soluta aperiam',
		label: 'Bogan Group',
		active: true,
		tags: ['sint', 'voluptas', 'assumenda']
	},
	{
		url: 'https://impressionable-coal.name/',
		periodicity: { unit: 'days', interval: 6 },
		regexp: 'blanditiis eius distinctio',
		label: 'Satterfield Group',
		active: true,
		tags: ['deleniti', 'explicabo', 'esse']
	},
	{
		url: 'https://avaricious-yeast.org/',
		periodicity: { unit: 'hours', interval: 1 },
		regexp: 'nihil quaerat laborum',
		label: 'Wolf LLC',
		active: false,
		tags: ['commodi', 'culpa', 'alias']
	},
	{
		url: 'https://stylish-petticoat.net',
		periodicity: { unit: 'hours', interval: 2 },
		regexp: 'molestiae dolorem saepe',
		label: 'Parisian, Nienow and Glover',
		active: true,
		tags: ['quisquam', 'quisquam', 'animi']
	},
	{
		url: 'https://oddball-sloth.info',
		periodicity: { unit: 'minutes', interval: 4 },
		regexp: 'eveniet minima voluptatum',
		label: 'Zemlak, Runte and Schoen',
		active: false,
		tags: ['alias', 'inventore', 'ipsum']
	},
	{
		url: 'https://glass-fav.name',
		periodicity: { unit: 'days', interval: 4 },
		regexp: 'beatae hic doloribus',
		label: 'Barton, Kreiger and Rogahn',
		active: false,
		tags: ['nulla', 'excepturi', 'blanditiis']
	},
	{
		url: 'https://hurtful-hoof.net',
		periodicity: { unit: 'hours', interval: 7 },
		regexp: 'nisi officia odit',
		label: 'Schowalter - Hintz',
		active: true,
		tags: ['rem', 'dolores', 'omnis']
	},
	{
		url: 'https://dirty-meter.name/',
		periodicity: { unit: 'days', interval: 9 },
		regexp: 'libero libero ab',
		label: 'Cole Inc',
		active: false,
		tags: ['voluptatem', 'facilis', 'optio']
	}
]);
db.createCollection("executions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "websiteRecordId",
        "crawlTimeStart",
        "crawlTimeEnd",
     	"status",
        "sitesCrawled",
	  ],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId",
        },
        websiteRecordId: {
          bsonType: "objectId",
          description: "must be an ObjectId and is required",
        },
        crawlTimeStart: {
          bsonType: "date",
          description: "must be a date and is required",
		},
        crawlTimeEnd: {
          bsonType: "date",
          description: "must be a date and is required",
        },
        status: {
          bsonType: "string",
          enum: ["success", "failed", "running"],
          description:
            'must be one of "success", "failed", or "running" and is required',
        },
        sitesCrawled: {
          bsonType: "int",
          minimum: 0,
          description: "must be a non-negative integer and is required",
        },
      },
    },
  },
});


db.executions.insertMany([
  {
    websiteRecordId: ObjectId("4eff53b7cb6d7a9e6c9addf4"),
    crawlTimeStart: ISODate("2022-12-20T11:32:14.442Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:19:45.332Z"),
    status: "running",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("6adcddab61afa909fcad5beb"),
    crawlTimeStart: ISODate("2023-03-08T22:27:56.133Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:51:45.919Z"),
    status: "failed",
    sitesCrawled: 2,
   },
  {
    websiteRecordId: ObjectId("c2b01d62ceb488ba1fedfbfc"),
    crawlTimeStart: ISODate("2023-01-09T11:42:06.903Z"),
    crawlTimeEnd: ISODate("2023-09-12T15:46:24.304Z"),
    status: "running",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("502d2baacc67016fb618364e"),
    crawlTimeStart: ISODate("2023-02-08T23:48:24.539Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:54:15.460Z"),
    status: "success",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("e3d35c0db3bcd541a9df8ac3"),
    crawlTimeStart: ISODate("2023-06-19T07:52:03.783Z"),
    crawlTimeEnd: ISODate("2023-09-12T03:44:08.498Z"),
    status: "failed",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("c22211cb82ebdfacaddec1fb"),
    crawlTimeStart: ISODate("2022-10-31T23:25:49.648Z"),
    crawlTimeEnd: ISODate("2023-09-12T06:45:46.014Z"),
    status: "success",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("bae1bf4b32fbd1aef9e2ab01"),
    crawlTimeStart: ISODate("2023-07-14T14:18:56.045Z"),
    crawlTimeEnd: ISODate("2023-09-12T21:07:03.461Z"),
    status: "success",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("ecae40add328ed64576a206c"),
    crawlTimeStart: ISODate("2023-04-23T12:29:05.903Z"),
    crawlTimeEnd: ISODate("2023-09-12T20:17:38.546Z"),
    status: "running",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("cb68bf1870f171b8bdc367c8"),
    crawlTimeStart: ISODate("2022-12-12T01:00:41.308Z"),
    crawlTimeEnd: ISODate("2023-09-12T09:27:02.297Z"),
    status: "running",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("1aea6cbe02437c17e0d7dbe8"),
    crawlTimeStart: ISODate("2022-09-28T09:03:02.291Z"),
    crawlTimeEnd: ISODate("2023-09-12T06:36:07.402Z"),
    status: "success",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("ca765c48defd113650cefd5e"),
    crawlTimeStart: ISODate("2023-09-01T02:26:03.947Z"),
    crawlTimeEnd: ISODate("2023-09-12T00:40:10.055Z"),
    status: "success",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("1bcaefe0222bea55f183e5cf"),
    crawlTimeStart: ISODate("2023-02-12T00:38:53.294Z"),
    crawlTimeEnd: ISODate("2023-09-12T16:13:07.413Z"),
    status: "running",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("dfb1f714ebebe9a3e582764e"),
    crawlTimeStart: ISODate("2023-08-17T10:23:56.482Z"),
    crawlTimeEnd: ISODate("2023-09-12T11:47:33.267Z"),
    status: "running",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("770fbedb2028beef8988aaad"),
    crawlTimeStart: ISODate("2022-10-21T07:49:09.174Z"),
    crawlTimeEnd: ISODate("2023-09-12T10:18:25.461Z"),
    status: "success",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("e10ddf7e094ca2cc1dbecaba"),
    crawlTimeStart: ISODate("2022-10-04T09:02:01.235Z"),
    crawlTimeEnd: ISODate("2023-09-11T23:32:01.134Z"),
    status: "failed",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("c36ef5ae93ee3f634ba1603a"),
    crawlTimeStart: ISODate("2023-05-27T13:42:54.134Z"),
    crawlTimeEnd: ISODate("2023-09-12T10:00:42.604Z"),
    status: "running",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("c2ba8bd00e4efd350cfd2bbc"),
    crawlTimeStart: ISODate("2023-06-27T16:33:37.333Z"),
    crawlTimeEnd: ISODate("2023-09-12T08:15:25.198Z"),
    status: "success",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("01619b8c7bb080c6acfae4e7"),
    crawlTimeStart: ISODate("2023-09-08T18:29:16.330Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:29:18.510Z"),
    status: "success",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("016b7cbcd394dbced1cbfc29"),
    crawlTimeStart: ISODate("2023-06-30T03:28:32.022Z"),
    crawlTimeEnd: ISODate("2023-09-12T09:47:12.622Z"),
    status: "failed",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("0ebfbef0fbaa45ffa2df17f5"),
    crawlTimeStart: ISODate("2023-03-02T20:29:02.051Z"),
    crawlTimeEnd: ISODate("2023-09-12T01:31:52.509Z"),
    status: "running",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("7f3a4c19b5e5fd8baceb9fab"),
    crawlTimeStart: ISODate("2022-11-11T00:07:25.236Z"),
    crawlTimeEnd: ISODate("2023-09-12T09:02:13.687Z"),
    status: "failed",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("b44bf9cbf5e889c4dc420df9"),
    crawlTimeStart: ISODate("2023-08-28T08:59:53.748Z"),
    crawlTimeEnd: ISODate("2023-09-12T17:49:11.720Z"),
    status: "failed",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("1fbdedb888531bfcf1ae14af"),
    crawlTimeStart: ISODate("2022-12-30T16:34:45.573Z"),
    crawlTimeEnd: ISODate("2023-09-12T05:15:00.402Z"),
    status: "failed",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("13d9bd343da1eade0792c5af"),
    crawlTimeStart: ISODate("2023-03-01T01:04:19.038Z"),
    crawlTimeEnd: ISODate("2023-09-12T21:31:58.775Z"),
    status: "running",
    sitesCrawled: 2,
  },
  {
    websiteRecordId: ObjectId("e24ca7e39dbbb4e437aa4b1a"),
    crawlTimeStart: ISODate("2023-09-10T11:16:56.102Z"),
    crawlTimeEnd: ISODate("2023-09-12T18:58:43.521Z"),
    status: "success",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("e0a68a2aaefdb13d211bd5ea"),
    crawlTimeStart: ISODate("2023-01-02T12:01:21.911Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:51:29.078Z"),
    status: "success",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("1af4aa8efacd2fde21daa46a"),
    crawlTimeStart: ISODate("2022-11-04T10:16:29.609Z"),
    crawlTimeEnd: ISODate("2023-09-12T17:29:30.872Z"),
    status: "success",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("5aac6b38e1fb53df5bdaf12a"),
    crawlTimeStart: ISODate("2023-03-16T09:17:56.817Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:59:56.718Z"),
    status: "success",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("f1befb6fff7d5bdad25ddd8c"),
    crawlTimeStart: ISODate("2023-04-29T03:51:49.498Z"),
    crawlTimeEnd: ISODate("2023-09-12T06:05:54.379Z"),
    status: "success",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("6c981d4eaf688bace63d78d5"),
    crawlTimeStart: ISODate("2023-06-29T16:36:03.221Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:00:35.482Z"),
    status: "failed",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("0f6ad2b50f06a6b13ea36bb9"),
    crawlTimeStart: ISODate("2023-02-28T19:14:36.550Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:47:58.275Z"),
    status: "running",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("e35b1cdfafcea6c90d68dbdf"),
    crawlTimeStart: ISODate("2023-02-26T22:26:01.594Z"),
    crawlTimeEnd: ISODate("2023-09-12T19:07:23.070Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("f1af2dfbb37deeaeab67f80d"),
    crawlTimeStart: ISODate("2022-09-19T18:54:17.341Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:59:24.452Z"),
    status: "success",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("6e2fdad2f6ac6d0dc0d32b42"),
    crawlTimeStart: ISODate("2022-10-31T05:19:11.613Z"),
    crawlTimeEnd: ISODate("2023-09-12T15:07:53.142Z"),
    status: "running",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("810e9061c3ee28d7b96477db"),
    crawlTimeStart: ISODate("2023-07-16T16:36:16.335Z"),
    crawlTimeEnd: ISODate("2023-09-12T05:59:53.462Z"),
    status: "failed",
    sitesCrawled: 2,
  },
  {
    websiteRecordId: ObjectId("fe9ee393c2edcff04e2a757f"),
    crawlTimeStart: ISODate("2023-07-05T00:33:04.782Z"),
    crawlTimeEnd: ISODate("2023-09-12T20:37:15.100Z"),
    status: "success",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("daa76408e60cfa4ecd369aad"),
    crawlTimeStart: ISODate("2022-12-29T17:43:31.013Z"),
    crawlTimeEnd: ISODate("2023-09-12T03:55:54.779Z"),
    status: "success",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("abd66affb853eeffe0a0cb7e"),
    crawlTimeStart: ISODate("2023-08-10T16:20:19.435Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:27:50.563Z"),
    status: "success",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("81e9e5c028ac46c35cce320a"),
    crawlTimeStart: ISODate("2023-06-28T19:29:16.531Z"),
    crawlTimeEnd: ISODate("2023-09-11T23:24:36.863Z"),
    status: "running",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("1db1fad3c9eb4c1b8a8f1c30"),
    crawlTimeStart: ISODate("2023-02-16T16:11:40.564Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:34:56.923Z"),
    status: "running",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("f3a18077c6cfeeeff005fecd"),
    crawlTimeStart: ISODate("2023-01-01T09:31:56.382Z"),
    crawlTimeEnd: ISODate("2023-09-12T00:32:41.326Z"),
    status: "failed",
    sitesCrawled: 2,
  },
  {
    websiteRecordId: ObjectId("4ffdbbdad150b1e7a5efcd34"),
    crawlTimeStart: ISODate("2023-08-14T00:54:52.869Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:54:08.605Z"),
    status: "running",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("d1a77bcdad234f52a7ee8cf9"),
    crawlTimeStart: ISODate("2022-11-24T01:12:43.874Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:50:31.336Z"),
    status: "success",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("b447fa975cec1592a068ea78"),
    crawlTimeStart: ISODate("2022-12-08T15:52:37.801Z"),
    crawlTimeEnd: ISODate("2023-09-12T22:54:56.243Z"),
    status: "failed",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("9bbccbcf584aa1e6313ca0fa"),
    crawlTimeStart: ISODate("2023-06-19T13:40:21.927Z"),
    crawlTimeEnd: ISODate("2023-09-12T05:39:56.449Z"),
    status: "failed",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("72fa08eb2a445e1f97ca0ce2"),
    crawlTimeStart: ISODate("2022-12-13T06:23:14.132Z"),
    crawlTimeEnd: ISODate("2023-09-12T01:43:24.881Z"),
    status: "running",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("45dad1ccdd4e7fab5f6cce41"),
    crawlTimeStart: ISODate("2023-08-11T00:58:33.602Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:15:04.213Z"),
    status: "failed",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("d8d4d60e8afa65f5ac6ced0e"),
    crawlTimeStart: ISODate("2022-10-05T05:45:16.600Z"),
    crawlTimeEnd: ISODate("2023-09-12T11:06:59.206Z"),
    status: "running",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("e7bf67eee874af0ae6ac3dff"),
    crawlTimeStart: ISODate("2022-10-09T09:12:56.071Z"),
    crawlTimeEnd: ISODate("2023-09-12T06:37:03.193Z"),
    status: "failed",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("397c8e2f1fa9379f012d2cc8"),
    crawlTimeStart: ISODate("2022-11-08T02:32:45.797Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:47:39.307Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("c2c9ba32eba0be4aebeb7a13"),
    crawlTimeStart: ISODate("2023-07-22T20:47:16.609Z"),
    crawlTimeEnd: ISODate("2023-09-12T16:09:32.527Z"),
    status: "running",
    sitesCrawled: 2,
  },
  {
    websiteRecordId: ObjectId("36d5b0fbd5ebeead42c9e3ae"),
    crawlTimeStart: ISODate("2023-02-12T16:06:50.830Z"),
    crawlTimeEnd: ISODate("2023-09-12T08:34:02.760Z"),
    status: "running",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("8f7254dcdccf9d0f3a889f2d"),
    crawlTimeStart: ISODate("2023-05-23T16:10:25.092Z"),
    crawlTimeEnd: ISODate("2023-09-12T02:17:02.222Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("58dfac3e39eafd0dcf5cad5c"),
    crawlTimeStart: ISODate("2023-03-31T07:37:59.669Z"),
    crawlTimeEnd: ISODate("2023-09-12T10:21:56.826Z"),
    status: "running",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("81fee355bd1ce2fafdaf8bfc"),
    crawlTimeStart: ISODate("2023-06-24T01:16:30.423Z"),
    crawlTimeEnd: ISODate("2023-09-11T23:39:11.471Z"),
    status: "success",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("cdde0cbdc09c1c1b5d6cfcf4"),
    crawlTimeStart: ISODate("2022-11-24T16:45:54.577Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:58:49.508Z"),
    status: "failed",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("0a9ac6cad7ffadc74d22f5ed"),
    crawlTimeStart: ISODate("2022-11-28T23:54:47.537Z"),
    crawlTimeEnd: ISODate("2023-09-12T16:39:45.280Z"),
    status: "failed",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("fdbb980d5a635c0a73d0bc36"),
    crawlTimeStart: ISODate("2023-01-11T22:52:19.206Z"),
    crawlTimeEnd: ISODate("2023-09-12T15:22:55.980Z"),
    status: "success",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("2d7cecaf5caf16df57bf75a8"),
    crawlTimeStart: ISODate("2023-06-27T10:39:46.976Z"),
    crawlTimeEnd: ISODate("2023-09-12T10:34:54.432Z"),
    status: "success",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("28bf75cdff653b89e1cae1f9"),
    crawlTimeStart: ISODate("2023-05-18T00:59:06.844Z"),
    crawlTimeEnd: ISODate("2023-09-12T18:46:36.531Z"),
    status: "running",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("88ecef9a27ec4481acf4e9fa"),
    crawlTimeStart: ISODate("2022-11-29T21:01:49.720Z"),
    crawlTimeEnd: ISODate("2023-09-12T09:53:32.043Z"),
    status: "success",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("f1dea2d8502d2eceda349dfd"),
    crawlTimeStart: ISODate("2023-06-30T03:39:55.240Z"),
    crawlTimeEnd: ISODate("2023-09-12T20:53:39.891Z"),
    status: "success",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("1fdbda3ac7b06c1d6dc9eec6"),
    crawlTimeStart: ISODate("2023-02-09T05:22:32.747Z"),
    crawlTimeEnd: ISODate("2023-09-12T01:45:57.218Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("ed66e6dce699bdcde357e7fd"),
    crawlTimeStart: ISODate("2022-10-28T18:43:24.983Z"),
    crawlTimeEnd: ISODate("2023-09-12T17:25:25.163Z"),
    status: "running",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("dae58ddbea6bbb7ef8aed00a"),
    crawlTimeStart: ISODate("2022-12-27T11:49:44.262Z"),
    crawlTimeEnd: ISODate("2023-09-12T15:24:51.943Z"),
    status: "failed",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("adaee9d13fc21bff2ff19f05"),
    crawlTimeStart: ISODate("2023-09-12T00:34:13.442Z"),
    crawlTimeEnd: ISODate("2023-09-12T22:09:25.954Z"),
    status: "success",
    sitesCrawled: 2,
  },
  {
    websiteRecordId: ObjectId("2afcfd60b631002d1e4163ee"),
    crawlTimeStart: ISODate("2022-10-13T01:41:11.968Z"),
    crawlTimeEnd: ISODate("2023-09-12T05:45:44.842Z"),
    status: "running",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("944af4ebceccfaa69b2c6ee6"),
    crawlTimeStart: ISODate("2022-09-14T15:47:49.160Z"),
    crawlTimeEnd: ISODate("2023-09-12T03:48:28.570Z"),
    status: "failed",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("352f4d4bba6d62f05a147fa1"),
    crawlTimeStart: ISODate("2023-05-26T11:40:37.976Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:52:22.371Z"),
    status: "success",
    sitesCrawled: 8,
  },
  {
    websiteRecordId: ObjectId("208deabbaa538b2db2fccde7"),
    crawlTimeStart: ISODate("2023-07-24T23:51:15.518Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:40:24.781Z"),
    status: "success",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("bda1a08dde1aad3eccabcc1a"),
    crawlTimeStart: ISODate("2023-04-08T12:40:47.263Z"),
    crawlTimeEnd: ISODate("2023-09-12T04:35:37.035Z"),
    status: "failed",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("3a0cc7efec78d0aa49c1ec3d"),
    crawlTimeStart: ISODate("2023-06-17T13:34:01.284Z"),
    crawlTimeEnd: ISODate("2023-09-12T01:16:00.026Z"),
    status: "running",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("221bffbb3bfa407e92bc127f"),
    crawlTimeStart: ISODate("2023-06-30T17:39:31.397Z"),
    crawlTimeEnd: ISODate("2023-09-12T03:46:31.990Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("da143e4cc89dcfe1bc1addf8"),
    crawlTimeStart: ISODate("2023-06-16T21:20:20.295Z"),
    crawlTimeEnd: ISODate("2023-09-12T09:38:14.302Z"),
    status: "failed",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("adb4df7ea1a6a9db8437e042"),
    crawlTimeStart: ISODate("2023-08-17T05:49:18.625Z"),
    crawlTimeEnd: ISODate("2023-09-12T14:53:50.764Z"),
    status: "failed",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("170acdcd29d6efbeeed8acfe"),
    crawlTimeStart: ISODate("2023-07-23T10:41:15.295Z"),
    crawlTimeEnd: ISODate("2023-09-12T18:19:01.171Z"),
    status: "running",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("909abec5f4cfdc5a89d33cc3"),
    crawlTimeStart: ISODate("2022-10-18T16:09:08.532Z"),
    crawlTimeEnd: ISODate("2023-09-12T15:59:01.104Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("105419a00fff706ecce30e9c"),
    crawlTimeStart: ISODate("2022-12-12T04:28:31.781Z"),
    crawlTimeEnd: ISODate("2023-09-12T11:09:00.823Z"),
    status: "failed",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("6df49ce027ded3382dcf4ddf"),
    crawlTimeStart: ISODate("2023-07-15T08:28:54.694Z"),
    crawlTimeEnd: ISODate("2023-09-12T04:42:53.211Z"),
    status: "failed",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("80ed4f177c8b857c1d0e4bd7"),
    crawlTimeStart: ISODate("2023-05-04T00:11:54.785Z"),
    crawlTimeEnd: ISODate("2023-09-12T10:00:16.912Z"),
    status: "failed",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("c2bbf4fc63af3a0edacafca4"),
    crawlTimeStart: ISODate("2023-02-25T03:49:47.178Z"),
    crawlTimeEnd: ISODate("2023-09-12T09:54:21.838Z"),
    status: "failed",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("a50435fc02cf7cd6e8ac8b2b"),
    crawlTimeStart: ISODate("2023-06-02T18:54:09.871Z"),
    crawlTimeEnd: ISODate("2023-09-12T07:37:43.457Z"),
    status: "running",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("769c5fbe12f660dd4ee0cfcc"),
    crawlTimeStart: ISODate("2023-07-04T19:03:52.458Z"),
    crawlTimeEnd: ISODate("2023-09-12T05:21:57.066Z"),
    status: "running",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("afd5b8d49bcba6b4a9376f20"),
    crawlTimeStart: ISODate("2023-04-24T20:43:45.558Z"),
    crawlTimeEnd: ISODate("2023-09-12T16:28:49.902Z"),
    status: "success",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("9f4cffebbc4e7bc5df049bd3"),
    crawlTimeStart: ISODate("2023-03-28T21:30:07.367Z"),
    crawlTimeEnd: ISODate("2023-09-12T18:19:35.903Z"),
    status: "running",
    sitesCrawled: 9,
  },
  {
    websiteRecordId: ObjectId("2bac9b37b44919cb2a2af485"),
    crawlTimeStart: ISODate("2023-03-03T17:41:08.826Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:33:31.251Z"),
    status: "failed",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("07bb06c0bd57f9e07dadb60c"),
    crawlTimeStart: ISODate("2023-02-02T14:48:38.741Z"),
    crawlTimeEnd: ISODate("2023-09-12T13:46:06.248Z"),
    status: "failed",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("b1bbee550fdfa79f7b1e2e39"),
    crawlTimeStart: ISODate("2023-05-01T13:17:10.655Z"),
    crawlTimeEnd: ISODate("2023-09-12T22:16:25.490Z"),
    status: "running",
    sitesCrawled: 3,
  },
  {
    websiteRecordId: ObjectId("7f5f1bedc41369a66a2ff9fd"),
    crawlTimeStart: ISODate("2023-06-25T19:59:09.686Z"),
    crawlTimeEnd: ISODate("2023-09-12T19:42:16.768Z"),
    status: "failed",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("6ad7b90bddae9f8bab2ee93a"),
    crawlTimeStart: ISODate("2022-12-01T07:34:05.510Z"),
    crawlTimeEnd: ISODate("2023-09-12T06:44:50.790Z"),
    status: "running",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("a3df655bbfdfd876f5df0ffb"),
    crawlTimeStart: ISODate("2023-05-03T20:30:08.681Z"),
    crawlTimeEnd: ISODate("2023-09-12T07:56:54.672Z"),
    status: "success",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("c4510d9ae258dac7614a7d7f"),
    crawlTimeStart: ISODate("2023-06-23T18:18:10.095Z"),
    crawlTimeEnd: ISODate("2023-09-12T00:08:26.931Z"),
    status: "failed",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("c3c4dc0c9acccebbfcaaef2a"),
    crawlTimeStart: ISODate("2023-08-05T13:37:47.472Z"),
    crawlTimeEnd: ISODate("2023-09-12T11:44:45.952Z"),
    status: "failed",
    sitesCrawled: 4,
  },
  {
    websiteRecordId: ObjectId("eaf2ec9cfe7ddbbc12d050f5"),
    crawlTimeStart: ISODate("2023-07-22T03:38:49.088Z"),
    crawlTimeEnd: ISODate("2023-09-12T12:07:56.938Z"),
    status: "running",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("2d5e6e89c0b2faeecfccdd6f"),
    crawlTimeStart: ISODate("2023-03-01T21:33:52.685Z"),
    crawlTimeEnd: ISODate("2023-09-12T17:52:49.589Z"),
    status: "failed",
    sitesCrawled: 2,
  },
  {
    websiteRecordId: ObjectId("bc86dde3acfdcc590796becf"),
    crawlTimeStart: ISODate("2023-07-16T06:47:45.073Z"),
    crawlTimeEnd: ISODate("2023-09-12T05:41:37.506Z"),
    status: "running",
    sitesCrawled: 7,
  },
  {
    websiteRecordId: ObjectId("cabbfd419c81f2daeb13aadd"),
    crawlTimeStart: ISODate("2023-06-04T11:53:03.535Z"),
    crawlTimeEnd: ISODate("2023-09-12T10:32:31.937Z"),
    status: "failed",
    sitesCrawled: 6,
  },
  {
    websiteRecordId: ObjectId("6500e9c889d77b62e42cd765"),
    crawlTimeStart: ISODate("2023-03-11T18:39:13.970Z"),
    crawlTimeEnd: ISODate("2023-09-12T03:32:28.657Z"),
    status: "success",
    sitesCrawled: 1,
  },
  {
    websiteRecordId: ObjectId("6500e9c889d77b62e42cd765"),
    crawlTimeStart: ISODate("2022-10-31T00:33:11.722Z"),
    crawlTimeEnd: ISODate("2023-09-12T01:18:26.970Z"),
    status: "failed",
    sitesCrawled: 5,
  },
  {
    websiteRecordId: ObjectId("6500e9c889d77b62e42cd765"),
    crawlTimeStart: ISODate("2023-06-17T01:43:45.509Z"),
    crawlTimeEnd: ISODate("2023-09-12T15:04:41.399Z"),
    status: "failed",
    sitesCrawled: 4,
  },
]);
