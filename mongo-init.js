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
db.createCollection('executions')
