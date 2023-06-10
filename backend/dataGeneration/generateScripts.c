#ifdef _WIN32
	#define _CRT_SECURE_NO_WARNINGS
	#pragma warning(disable : 4996)
#else 
	#define tolower(p) ((p) >= 'A' && (p) <= 'Z' ? (p) - 'A' + 'a' : (p))

	char* strlwr(char* str)
	{
		unsigned char* p = (unsigned char*)str;

		while (*p) {
			*p = tolower((unsigned char)*p);
			p++;
		}

		return str;
	}
#endif
#define dataForGeneration() 	char* cities[] = {\
"New York", "Los Angeles", "Washington", "Boston", "Detroit", "Miami",\
"Chicago", "San Francisco", "Seattle", "Houston", "Dallas", "Atlanta",\
"Philadelphia", "Denver", "San Diego", "Phoenix", "Las Vegas", "New Orleans",\
"Portland", "Nashville", "Minneapolis", "Charlotte", "Indianapolis", "Kansas City",\
"Cleveland", "Memphis", "St. Louis", "Baltimore", "Salt Lake City", "Austin",\
"San Antonio", "Orlando", "Tampa", "Sacramento", "Charlotte", "Columbus",\
"Pittsburgh", "Oakland", "Albuquerque", "Omaha", "Honolulu", "Madison"\
	};\
\
	char* streets[] = {\
		"Main Street", "Broadway", "Wall Street", "Fifth Avenue", "Rodeo Drive", "Hollywood Boulevard",\
		"Michigan Avenue", "Lombard Street", "Pike Place", "Beale Street", "Greenville Avenue", "Peachtree Street",\
		"South Street", "Larimer Square", "Gaslamp Quarter", "Camelback Road", "The Strip", "Bourbon Street",\
		"Hawthorne Boulevard", "Broadway", "Hennepin Avenue", "Trade Street", "Meridian Street", "Grand Boulevard",\
		"Euclid Avenue", "Beale Street", "The Delmar Loop", "Charles Street", "Main Street", "Sixth Street",\
		"State Street", "Sunset Boulevard", "Collins Avenue", "Pennsylvania Avenue", "Rush Street", "Pico Boulevard",\
		"Market Street", "Elm Street", "Canal Street", "Church Street", "Santa Monica Boulevard", "Haight Street"\
	};\
\
	char* firstName[] = {\
		"Emily", "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper",\
		"Evelyn", "Abigail", "Ella", "Elizabeth", "Sofia", "Madison", "Avery", "Mila", "Aria", "Scarlett",\
		"Grace", "Chloe", "Victoria", "Riley", "Aubrey", "Zoey", "Lily", "Hannah", "Samantha", "Layla",\
		"Daniel", "David", "William", "Mason", "Ethan", "Michael", "Jacob", "Noah", "Liam", "Oliver",\
		"Alexander", "Lucas", "Benjamin", "Elijah", "James", "Logan", "Aiden", "Caleb", "Caden", "Jackson",\
		"Gabriel", "Nicholas", "John", "Samuel", "Matthew", "Luke", "Joseph", "Andrew", "Owen", "Max"\
	};\
\
	char* lastName[] = {\
		"Smith", "Johnson", "Williams", "Jones", "Brown", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",\
		"Hernandez", "Lopez", "Gonzalez", "Perez", "Jackson", "Harris", "Clark", "Lewis", "Allen", "Young",\
		"Walker", "Hall", "Green", "Baker", "Adams", "Nelson", "Carter", "Mitchell", "Parker", "Collins",\
		"King", "Scott", "Wright", "Lee", "Turner", "Campbell", "Gomez", "Reed", "Phillips", "Morgan",\
		"Cooper", "Peterson", "Perry", "Powell", "Long", "Bryant", "James", "Watson", "Evans", "Foster",\
		"Gordon", "Ramos", "Washington", "Butler", "Simmons", "Frazier", "Murray", "Sanders", "Webb", "Hunter"\
	};\
\
	char* companyFirstNames[] = {\
		"Avalon", "Bluebird", "Catalyst", "Dreamscape", "Everest", "Frontier", "Galaxy", "Horizon", "Innovative", "Journey",\
		"Kaleidoscope", "Legacy", "Momentum", "Nebula", "Odyssey", "Pinnacle", "Quest", "Radiance", "Summit", "Tranquility",\
		"Uplift", "Velocity", "Wavelength", "Xenith", "Yellowstone", "Zenith", "Ascent", "Bridge", "Crescent", "Daybreak",\
		"Elevate", "Foothills", "Gateway", "Harbor", "Island", "Junction", "Keystone", "Lighthouse", "Mirage", "Nexus"\
	};\
	\
	char* companyLastNames[] = {\
		"Enterprises", "Industries", "Corporation", "Group", "Holdings", "Limited", "Solutions", "International", "Services", "Inc",\
		"Ventures", "Partners", "Consulting", "Logistics", "Commerce", "Development", "Technologies", "Management", "Associates", "Innovations",\
		"Investments", "Capital", "Marketing", "Trading", "Global", "Network", "Alliance", "Resources", "Systems", "Strategy",\
		"Enterprize", "Agency", "Association", "Federation", "Foundation", "Fund", "Institute", "Trust", "Union", "United"\
	};\
		\
	char* guitarTypes[] = {\
		"acoustic", "electric", "electro-acoustic", "classical"\
	};\
		\
		\
	char* emailProviders[] = {\
		"gmail.com", "yahoo.com", "outlook.com", "hotmail.com"\
	};\
\
	char* colors[] = {\
		"red", "green", "blue", "yellow", "purple", "pink", "orange", "black", "white", "gray"\
	};\
\
	char* guitarFirstNames[] = {\
		"Stratocaster", "Telecaster", "Les Paul", "SG", "Explorer", "Flying V", "Firebird", "Jaguar", "Jazzmaster", "Duo-Sonic",\
		"Mustang", "Rickenbacker", "Gibson", "Fender", "Epiphone"\
	};\
\
	char* guitarLastNames[] = {\
		"Standard", "Deluxe", "Custom", "Signature", "Artist", "Classic", "Vintage", "Modern", "Elite", "Plus",\
		"Ultra", "Special", "Pro", "Original", "Limited"\
	};\
	int id = 0;\
	char address[256] = { 0 };\
	char birthDate[11] = { 0 };\
	char email[65] = { 0 };\
	char name[65] = { 0 };\
	char telephoneNumber[11] = { 0 };\
	char description[256] = { 0 };

#define generate_id(id, i, j, maxJ) (id) = (i) * (maxJ) + (j) + (1)
#define sizeofMatrix(m) (sizeof((m)) / sizeof((m[0])))
#define openGenerationFile(type) FILE* type##_file = NULL;\
								if (generate_##type) type##_file = \
								fopen("generate_"#type".sql", "w")
#define safeClose(type) if (type##_file) fclose(type##_file)
#define defineBound(type) int type##First = inserts_no * batches_no * ((boundIndex)++), type##Last = type##First + batches_no 
#define user_created_insert_into() fprintf(user_created_file, "INSERT INTO user_created(id,user_id) VALUES ")
#define user_created_values(type) fprintf(user_created_file,"(%d,%d)",id, rand() % total_users + 1);\
fprintf(user_created_file, j < type##Last - 1 ? "," : ";\n")

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

void generate_birthDate(char* birthDate);
void generate_telephoneNumber(char* telephoneNumber);
void generate_address(char* address, int citiesSize, char* cities[], int streetsSize, char* streets[]);
void generate_name(char* name, int firstNameSize, char* firstName[], int lastNameSize, char* lastName[]);
void generate_email(char* email, char* name, int emailProvidersSize, char* emailProviders[]);
void generate_description(char* description, int matrixSize, char* matrix[]);

int main(int argc, char** argv)
{
	srand(time(NULL));

	int inserts_no = 10;
	int batches_no = 10;
	int total_users = 10000;

	char generate_clients = 0;
	char generate_couriers = 0;
	char generate_products = 0; 
	char generate_guitars = 0; 
	char generate_shops = 0;
	char generate_shopsCouriers = 0;
	char generate_transactions = 0;
	char generate_users = 0;
	char generate_records_delete = 0;

	for (int i = 2; i <= argc; i++)
	{
		argv++;
		if (strcmp(*argv, "-i") == 0 || strcmp(*argv, "-b") == 0)
		{
			if (i == argc)
				goto cleanup;
			i++;
			argv++;
			int no = 0;
			for (char* x = *argv; *x; x++)
			{
				if (*x < '0' || *x > '9')
					goto cleanup;
				no = no * 10 + (*x - '0');
			}
			if (no == 0)
			{
				printf("Number needs to be greater than zero!\n");
				return -1;
			}
			if (strcmp(*(argv - 1), "-i") == 0)
				inserts_no = no;
			else
				batches_no = no;
		}
		else if (strcmp(*argv, "--all") == 0)
		{
			generate_clients = 1;
			generate_couriers = 1;
			generate_guitars = 1;
			generate_shops = 1;
			generate_shopsCouriers = 1;
			generate_transactions = 1;
			generate_users = 1;
			generate_products = 1;
			generate_records_delete = 1;
		}
		else if (strcmp(*argv, "--clients") == 0)
		{
			generate_clients = 1;
		}
		else if (strcmp(*argv, "--couriers") == 0)
		{
			generate_couriers = 1;
		}
		else if (strcmp(*argv, "--guitars") == 0)
		{
			generate_guitars = 1;
			generate_products = 1;
		}
		else if (strcmp(*argv, "--shops") == 0)
		{
			generate_shops = 1;
		}
		else if (strcmp(*argv, "--shops_couriers") == 0)
		{
			generate_shopsCouriers = 1;
		}
		else if (strcmp(*argv, "--transactions") == 0)
		{
			generate_transactions = 1;
		}
		else if (strcmp(*argv, "--users") == 0)
		{
			generate_users = 1;
		}
		else if (strcmp(*argv, "--records_delete") == 0) {
			generate_records_delete = 1;
		}
		else
		{
		cleanup:
			printf("usage: -i numberOfInserts -b numberOfBatches --all --clients --couriers --shops --guitars --shops_couriers --transactions --users --records_delete\n");
			return -1;
		}
	}

	int total_no = inserts_no * batches_no;
	

	dataForGeneration();

	openGenerationFile(clients);
	openGenerationFile(couriers);
	openGenerationFile(shops);
	openGenerationFile(shopsCouriers);
	openGenerationFile(transactions);
	openGenerationFile(products);
	openGenerationFile(guitars);
	openGenerationFile(records_delete);

	FILE* users_file = NULL;
	FILE* users_profiles_file = NULL;
	FILE* user_created_file = NULL;
	FILE* authorities_file = NULL;

	if (generate_users)
		users_file = fopen("generate_users.sql", "w"),
		users_profiles_file = fopen("generate_users_profiles.sql", "w"),
		authorities_file = fopen("generate_authorities.sql", "w");
	if (generate_clients || generate_couriers || generate_shops || generate_guitars ||
		generate_shopsCouriers || generate_transactions)
		user_created_file = fopen("generate_user_created.sql", "w");


	int boundIndex = 0;
	defineBound(clients);
	defineBound(couriers);
	defineBound(shops);
	defineBound(transactions);
	defineBound(guitars);

	for (int i = 0; i < inserts_no; i++)
	{	
		if (generate_clients)
		{
			user_created_insert_into();
			fprintf(clients_file, 
				"INSERT INTO client(id,address,birth_date,email,name,telephone_number) VALUES ");
			for (int j = clientsFirst; j < clientsLast; j++)
			{
				generate_id(id, i, j, batches_no);
				generate_address(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
				generate_birthDate(birthDate);
				generate_name(name, sizeofMatrix(firstName), firstName, sizeofMatrix(lastName), lastName);
				generate_email(email, name, sizeofMatrix(emailProviders), emailProviders);
				generate_telephoneNumber(telephoneNumber);

				fprintf(
					clients_file,
					"(%d,'%s','%s','%s','%s','%s')",
					id, address, birthDate, email, name, telephoneNumber
				);
				fprintf(clients_file, j < clientsLast - 1 ? "," : ";\n");

				user_created_values(clients);
			}
		}

		if (generate_couriers)
		{
			user_created_insert_into();

			fprintf(couriers_file,
				"INSERT INTO courier(id,address,delivery_price,email,name,telephone_number,description) VALUES ");
			for (int j = couriersFirst; j < couriersLast; j++)
			{
				generate_id(id, i, j, batches_no);
				generate_address(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
				generate_name(name, sizeofMatrix(companyFirstNames), 
					companyFirstNames, sizeofMatrix(companyLastNames), companyLastNames);
				generate_email(email, name, sizeofMatrix(emailProviders), emailProviders);
				generate_telephoneNumber(telephoneNumber);
				generate_description(description, sizeofMatrix(cities), cities);

				fprintf(
					couriers_file,
					"(%d,'%s',%d,'%s','%s','%s','%s')",
					id, address, rand() % 200 + 30, email, name, telephoneNumber, description
				);
				fprintf(couriers_file, j < couriersLast - 1 ? "," : ";\n");

				user_created_values(couriers);
			}
		}

		if (generate_shops)
		{
			user_created_insert_into();

			fprintf(shops_file,
				"INSERT INTO shop(id,address,email,name,shipping_available,telephone_number) VALUES ");
			for (int j = shopsFirst; j < shopsLast; j++)
			{
				generate_id(id, i, j, batches_no);
				generate_address(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
				generate_name(name, sizeofMatrix(companyFirstNames),
					companyFirstNames, sizeofMatrix(companyLastNames), companyLastNames);
				generate_email(email, name, sizeofMatrix(emailProviders), emailProviders);
				generate_telephoneNumber(telephoneNumber);

				fprintf(
					shops_file,
					"(%d,'%s','%s','%s','%s','%s')",
					id, address, email, name, rand() % 4 == 0 ? "f" : "t", telephoneNumber
				);
				fprintf(shops_file, j < shopsLast - 1 ? "," : ";\n");

				user_created_values(shops);
			}
		}

		if (generate_guitars)
		{
			user_created_insert_into();

			fprintf(products_file, "INSERT INTO product(dtype,id,price,shop_id) VALUES ");

			fprintf(guitars_file,
				"INSERT INTO guitar(id,color,creation_year,model,type) VALUES ");
			for (int j = guitarsFirst; j < guitarsLast; j++)
			{
				generate_id(id, i, j, batches_no);
				generate_name(name, sizeofMatrix(guitarFirstNames),
					guitarFirstNames, sizeofMatrix(guitarLastNames), guitarLastNames);

				fprintf(
					products_file, 
					"('%s',%d,%d,%d)",
					"Guitar",
					id,
					rand() % 3000 + 1000,
					rand() % total_no + shopsFirst + 1
				);

				fprintf(
					guitars_file,
					"(%d,'%s',%d,'%s','%s')",
					id,
					colors[rand() % sizeofMatrix(colors)],
					rand() % 20 + 2000,
					name,
					guitarTypes[rand() % sizeofMatrix(guitarTypes)]
				);

				fprintf(products_file, j < guitarsLast - 1 ? "," : ";\n");
				fprintf(guitars_file, j < guitarsLast - 1 ? "," : ";\n");

				user_created_values(guitars);
			}
		}

		if (generate_shopsCouriers)
		{
			int total = total_no < 10 ? total_no : 10;
			fprintf(shopsCouriers_file, "INSERT INTO shop_courier(shop_id,courier_id) VALUES ");
			for (int j = shopsFirst; j < shopsLast; j++)
			{
				generate_id(id, i, j, batches_no); // shop_id
				for (int index = 1; index <= total; index++)
				{
					fprintf(
						shopsCouriers_file,
						"(%d,%d)",
						id,
						rand() % total_no + couriersFirst + 1
					);
					fprintf(shopsCouriers_file, (j < shopsLast - 1) || (index < total) ? "," : ";\n");
				}
			}
		}

		if (generate_transactions)
		{
			user_created_insert_into();

			fprintf(transactions_file, 
				"INSERT INTO transaction(id,date,is_cash_payment,client_id,product_id) VALUES ");
			for (int j = transactionsFirst; j < transactionsLast; j++)
			{
				generate_id(id, i, j, batches_no); 
				generate_birthDate(birthDate);
				fprintf(
					transactions_file,
					"(%d,'%s','%s',%d,%d)",
					id,
					birthDate,
					rand() % 3 == 0 ? "t" : "f",
					rand() % total_no + clientsFirst + 1,
					rand() % total_no + guitarsFirst + 1
				);
				fprintf(transactions_file, j < transactionsLast - 1 ? "," : ";\n");

				user_created_values(transactions);
			}
		}
	}

	if (generate_users) {
		char firstNameString[30] = { 0 };
		char lastNameString[30] = { 0 };
		char usernameString[65] = { 0 };

		char insertIntoUsers[] = "INSERT INTO user_table(id,email,password,username,confirmation_code,is_enabled,confirmation_code_set_time) VALUES ";
		fprintf(users_file, "%s",
			insertIntoUsers);

		char insertIntoProfiles[] = "INSERT INTO user_profile(id, user_id, telephone_number, first_name, last_name, birth_date, address) VALUES ";
		fprintf(users_profiles_file, "%s", insertIntoProfiles);

		char insertIntoUserAuthority[] = "INSERT INTO user_authority(user_id,authority_id) VALUES ";
		fprintf(authorities_file, "%s", insertIntoUserAuthority);

		for (int i = 1; i <= total_users; i++) {
			generate_address(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
			generate_birthDate(birthDate);
			generate_telephoneNumber(telephoneNumber);
			strcpy(firstNameString, firstName[rand() % sizeofMatrix(firstName)]);
			strcpy(lastNameString, lastName[rand() % sizeofMatrix(lastName)]);
			sprintf(name, "%s %s", firstNameString, lastNameString);

			fprintf(users_profiles_file,
				"(%d,%d,'%s','%s','%s','%s','%s')",
				i,
				i,
				telephoneNumber,
				firstNameString,
				lastNameString,
				birthDate,
				address
			);

			generate_email(email, name, sizeofMatrix(emailProviders), emailProviders);
			strcpy(usernameString, strlwr(firstNameString));
			strcat(usernameString, strlwr(lastNameString));

			sprintf(usernameString + strlen(usernameString), "%d%d", rand() % 10, rand() % 10);

			fprintf(users_file,
				"(%d,'%s','%s','%s','%s','%s',%d)",
				i,
				email,
				"$2a$10$Moqxwu.hmbLKzzwI5T14ge6Mp3K.KTEdXJJKRjZZMiJqt1V5mnFzK", // password='password'
				usernameString,
				"",
				"t",
				0
			);

			int maxAuthority = rand() % 4 == 0 ? 2 : 1;
			for (int auth_i = 1; auth_i <= maxAuthority; auth_i++) {
				fprintf(authorities_file,
					(auth_i == maxAuthority ? "(%d,%d)" : "(%d,%d),"),
					i,
					auth_i
					);
			}

			fprintf(users_file, i < total_users && i % 1000 != 0 ? "," : ";\n");
			fprintf(users_profiles_file, i < total_users && i % 1000 != 0 ? "," : ";\n");
			fprintf(authorities_file, i < total_users&& i % 1000 != 0 ? "," : ";\n");
			if (i < total_users && i % 1000 == 0) {
				fprintf(users_file, "%s", insertIntoUsers);
				fprintf(users_profiles_file, "%s", insertIntoProfiles);
				fprintf(authorities_file, "%s", insertIntoUserAuthority);
			}
		}
	}

	if (generate_records_delete) {
		fprintf(
			records_delete_file,
			"DELETE FROM guitar;\n"
			"DELETE FROM shop_courier;\n"
			"DELETE FROM courier;\n"
			"DELETE FROM transaction;\n"
			"DELETE FROM client;\n"
			"DELETE FROM product;\n"
			"DELETE FROM shop;\n"
			"DELETE FROM user_authority UA"
			" WHERE UA.user_id NOT IN"
			" (SELECT UT.id FROM user_table UT INNER JOIN user_authority UA2 ON UT.id=UA2.user_id"
			" INNER JOIN authority A ON A.id=UA2.authority_id AND A.role='ADMIN');\n"
			"DELETE FROM user_created;\n"
			"DELETE FROM user_profile UP "
			"WHERE UP.user_id NOT IN"
			" (SELECT UT.id FROM user_table UT INNER JOIN user_authority UA ON UT.id=UA.user_id"
			" INNER JOIN authority A ON A.id=UA.authority_id AND A.role='ADMIN');\n"
			"DELETE FROM user_table UT "
			"WHERE UT.id NOT IN"
			" (SELECT UT2.id FROM user_table UT2 INNER JOIN user_authority UA ON UT2.id=UA.user_id"
			" INNER JOIN authority A ON A.id=UA.authority_id AND A.role='ADMIN');\n"
		);
	}

	safeClose(clients);
	safeClose(couriers);
	safeClose(shops);
	safeClose(products);
	safeClose(guitars);
	safeClose(shopsCouriers);
	safeClose(transactions);
	safeClose(users);
	safeClose(users_profiles);
	safeClose(user_created);
	safeClose(authorities);
	safeClose(records_delete);

	return 0;
}


void generate_birthDate(char* birthDate)
{
	sprintf(birthDate, "%02d-%02d-%d", rand() % 28 + 1, rand() % 12 + 1, rand() % 45 + 1960);
}

void generate_telephoneNumber(char* telephoneNumber)
{
	strcpy(telephoneNumber, "07");
	for (int index = 2; index < 10; index++)
		telephoneNumber[index] = (rand() % 10) + '0';
}

void generate_address(char* address, int citiesSize, char* cities[], int streetsSize, char* streets[])
{
	sprintf(
		address, 
		"%s, %s %d",
		cities[rand() % citiesSize],
		streets[rand() % streetsSize],
		rand() % 200 + 1
	);
}

void generate_name(char* name, int firstNameSize, char* firstName[], int lastNameSize, char* lastName[])
{
	sprintf(name, "%s %s", firstName[rand() % firstNameSize], lastName[rand() % lastNameSize]);
}

void generate_email(char* email, char* name, int emailProvidersSize, char* emailProviders[])
{
	while (*name)
	{
		if (*name >= 'A' && *name <= 'Z')
			*email = (*name - 'A') + 'a', email++;
		else if (*name != ' ')
			*email = *name, email++;
		name++;
	}
	*email = '@';
	email++;
	*email = '\0';
	strcat(email, emailProviders[rand() % emailProvidersSize]);
}

void generate_description(char* description, int matrixSize, char* matrix[])
{
	strcpy(description, "");
	for (int i = 0; i < 3; i++)
	{
		for (int j = 0; j < 5; j++)
		{
			strcat(description, matrix[rand() % matrixSize]);
			strcat(description, " ");
		}
		strcat(description, "\n");
	}
}