<?php

namespace App\DataFixtures;

use App\Entity\City;
use App\Entity\Flag;
use App\Entity\MenuCategory;
use App\Entity\Pays;
use App\Entity\Domain;
use App\Entity\Gender;
use App\Entity\Leader;
use App\Entity\JobType;
use App\Entity\Currency;
use App\Entity\JobGrade;
use App\Entity\Language;
use App\Entity\HotelService;
use App\Entity\ThingsToDo;
use App\Entity\CompanySize;
use App\Entity\CompanyType;
use App\Entity\CuisineType;
use App\Entity\RestaurantType;
use App\Entity\CountryThumbnail;
use App\Entity\AccomodationEquipment;
use App\Entity\BathroomEquipment;
use App\Entity\HotelEquipment;
use App\Entity\AccomodationService;
use App\Entity\RestaurantService;
use App\Entity\TypeBreakfast;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class AppFixtures extends Fixture
{
    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function load(ObjectManager $manager): void
    {
        $imgDir = $this->kernel->getProjectDir() . '/public/img/flags';
        $newDir = $this->kernel->getProjectDir() . '/public/upload/img/flags';

        $imgDirThumb = $this->kernel->getProjectDir() . '/public/country';
        $newDirThumb = $this->kernel->getProjectDir() . '/public/upload/img/countries';

        $countries = [
            'Algérie' => [
                'population'=> '45,400,000',
                'populationDensity' => '19',
                'gdp'=>'628.990 billion',
                'area'=>'2,381,741',
                'gdpNominal'=>'4,874',
                'flag' => 'algeria.svg',
                'countryCode' => '213',
                'description'=>'
                L\'Algérie est un pays nord-africain doté d\'un littoral sur la mer Méditerranée et d\'un intérieur désertique, le Sahara.
                 De nombreux empires y ont laissé leur marque, comme les anciennes ruines romaines de Tipasa, en bord de mer. Dans la capitale,
                  Alger, des sites ottomans, tels que la mosquée Ketchaoua, datant de 1612 environ, bordent le quartier de la Casbah.
                   Perché sur une colline, cet endroit dispose d\'allées étroites et d\'escaliers. La basilique Notre-Dame d\'Afrique,
                    arborant une architecture néo-byzantine, date de la domination coloniale française
                ',
                'countryThumbnail' => ['Algerie 1.jpg','Algerie 2.jpg','Algerie 3.jpg'],
                'cities' => ['Alger', 'Oran', 'Constantine', 'Annaba'],
                'languages' => ['Arabe', 'Berbère', 'Français'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Abdelmadjid Tebboune',
                        'startOfMandate' => '2019-12-19',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://i.ytimg.com/vi/jmn2OMIbKAk/maxresdefault.jpg',
                    ]
                ]
            ],
            'Angola' => [
                'population'=> '37,290,193',
                'populationDensity' => '24,97',
                'gdp'=>'260.323 billion',
                'area'=>'1,246,700',
                'gdpNominal'=>'2,550',
                'countryCode' => '244',
                'description'=> '
                L\'Angola est un pays sud-africain à la géographie très variée. Vous pourrez y admirer les plages tropicales
                 sur l\'Atlantique, un labyrinthe de fleuves et rivières et aussi un désert subsaharien qui s\'étend jusqu\'à
                  la Namibie. L\'histoire coloniale du pays se reflète dans la cuisine d\'influence portugaise et ses sites
                   emblématiques comme la forteresse de São Miguel, un édifice bâti en 1576 par les Portugais pour défendre
                    la capitale, Luanda. 
                ',
                'flag' => 'angola.svg',
                'countryThumbnail' => ['Angola 1.jpg','Angola 2.jpg','Angola 3.jpg'],
                'cities' => ['Luanda', 'Lobito', 'Huambo', 'Benguela'],
                'languages' => ['Portugais', 'Ovimbundu', 'Kimbundu'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'João Lourenço',
                        'startOfMandate' => '2017-09-26',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2018-07-04_President_Jo%C3%A3o_Louren%C3%A7o-0555.jpg/220px-2018-07-04_President_Jo%C3%A3o_Louren%C3%A7o-0555.jpg',
                    ]
                ]
            ],
            'Bénin' => [
                'population'=> '13,754,688',
                'populationDensity' => '94.8',
                'gdp'=>'59.241 billion',
                'area'=>'114,763',
                'gdpNominal'=>'1,449',
                'flag' => 'benin.svg',
                'countryCode' => '229',
                'description'=>'
                Le Bénin est un pays francophone d\'Afrique de l\'Ouest. Il est le berceau de la religion vaudou, 
                mais aussi le territoire de l\'ancien Royaume de Dahomey (environ 1600-1900). À Abomey, ancienne
                 capitale de Dahomey, le musée historique occupe deux palais royaux ornés de bas-reliefs retraçant 
                 l\'histoire du royaume et d\'un trône monté sur des crânes humains. Au nord, le parc national de
                  Pendjari propose des safaris à la découverte des éléphants, des hippopotames et des lions.
                ',
                'countryThumbnail' => ['Benin 1.jpg','Benin 2.jpg','Benin 3.jpg'],
                'cities' => ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi'],
                'languages' => ['Français', 'Fon', 'Yoruba'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Patrice Talon',
                        'startOfMandate' => '2016-04-06',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Patrice_Talon_at_the_52nd_African_Development_Bank_Annual_Meeting_in_Gandhinagar_%28Cropped%29.jpg',
                    ]
                ]
            ],
            'Botswana' => [
                'population'=> '2,675,352',
                'populationDensity' => '4.6',
                'gdp'=>'51.886 billion',
                'area'=>'581,730',
                'gdpNominal'=>'7,757',
                'flag' => 'botswana.svg',
                'countryCode' => '267',
                'description'=>'
                Le Botswana est un pays enclavé de l’Afrique australe. Le désert du Kalahari et le delta de
                 l’Okavango recouvrent la majorité de son territoire, et offrent aux animaux une végétation 
                 luxuriante pendant les inondations saisonnières. L’immense réserve de chasse du Kalahari central,
                  avec ses vallées fossiles asséchées et ses prairies vallonnées, abrite de nombreuses espèces 
                  comme des girafes, des guépards, des hyènes et des chiens sauvages. Les safaris sont une 
                  activité très pratiquée au Botswana. 
                ',
                'countryThumbnail' => ['Botswana 1.jpg','Botswana 2.jpg','Botswana 3.jpg'],
                'cities' => ['Gaborone', 'Francistown', 'Molepolole', 'Serowe'],
                'languages' => ['Anglais', 'Tswana', 'Kalahari'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Mokgweetsi Masisi',
                        'startOfMandate' => '2018-04-01',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqIReo3HdkTE_wQH5b66CbzPwQNK7VFxIUGJWeLBwVNpXOub4l8jda9bw7xXlIH8H66o8&usqp=CAU',
                    ]
                ]
            ],
            'Burkina Faso' => [
                'population'=> '',
                'gdp'=>'',
                'gdpNominal'=>'',
                'flag' => 'burkina_faso.svg',
                'countryCode' => '226',
                'description'=>'',
                'countryThumbnail' => ['Burkina Faso 1.jpg','Burkina Faso 2.jpg','Burkina Faso 3.jpg'],
                'cities' => ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya'],
                'languages' => ['Français', 'Mossi', 'Fulfulde']
            ],
            'Burundi' => [
                'population'=> '13,162,952',
                'populationDensity' => '473',
                'gdp'=>'11.551 billion',
                'area'=>'27,834',
                'gdpNominal'=>'245',
                'flag' => 'burundi.svg',
                'countryCode' => '257',
                'description'=>'
                Le Burundi, en forme longue la république du Burundi, est un pays d\'Afrique de l\'Est sans accès à la mer mais
                 possédant un grand rivage sur le lac Tanganyika, situé dans la région des Grands Lacs et bordé à l\'ouest par la 
                 république démocratique du Congo, au nord par le Rwanda et à l\'est et au sud par la Tanzanie
                ',
                'countryThumbnail' => ['Burundi 1.jpg','Burundi 2.jpg','Burundi 3.jpg'],
                'cities' => ['Bujumbura', 'Gitega', 'Ngozi', 'Muyinga'],
                'languages' => ['Kirundi', 'Français', 'Anglais'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Évariste Ndayishimiye',
                        'startOfMandate' => '2020-06-18',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Evariste_Ndayishimiye_%28cropped%29.jpg/220px-Evariste_Ndayishimiye_%28cropped%29.jpg',
                    ]
                ]
            ],
            'Cameroun' => [
                'population'=> '30,135,732',
                'populationDensity' => '39.7',
                'area'=>'475,442',
                'gdp'=>'133.335 billion',
                'gdpNominal'=>'1,721',
                'flag' => 'cameroun.svg',
                'countryCode' => '237',
                'description'=>'
                Le cameroun, en forme longue la république du Cameroun (en anglais : Cameroon et Republic of Cameroon), 
                est un État d\'Afrique du Centre-Ouest situé entre le Nigeria au nord-nord-ouest, le Tchad au nord-nord-est,
                 la République centrafricaine à l\'est, la république du Congo au sud-est, le Gabon au sud,
                  la Guinée équatoriale au sud-ouest et le golfe de Guinée au sud-ouest. Les langues officielles
                   sont le français et l\'anglais pour un pays qui compte une multitude de langues locales.
                ',
                'countryThumbnail' => ['Cameroun 1.jpg','Cameroun 2.jpg','Cameroun 3.jpg'],
                'cities' => ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
                'languages' => ['Français', 'Anglais', 'Pidgin'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Paul Biya',
                        'startOfMandate' => '1982-11-06',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Paul_Biya_2014.png/220px-Paul_Biya_2014.png',

                    ]
                ]
            ],
            'Cap-Vert' => [
                'population'=> '561,901',
                'populationDensity' => '123.7',
                'area'=>'4,033',
                'gdp'=>'5.717 billion',
                'gdpNominal'=>'4,502',
                'flag' => 'cape_verde.svg',
                'countryCode' => '238',
                'description'=>'
                Le Cap-Vert, ou Cabo Verde, est un État insulaire composé d’un archipel d’îles volcaniques.
                 Il est situé au large de la côte nord-ouest de l’Afrique. Il est réputé pour sa culture créole
                  afro-portugaise, sa musique morna et ses nombreuses plages. La plus grande île, Santiago, 
                  abrite la capitale actuelle, Praia, et l’ancienne capitale, Cidade Velha, avec sa forteresse
                   Fort Real de São Filipe perchée au sommet d’une falaise.
                ',
                'countryThumbnail' => ['Cap-Vert 1.jpg','Cap-Vert 2.jpg','Cap-Vert 3.jpg'],
                'cities' => ['Praia', 'Mindelo', 'Assomada', 'Tarrafal'],
                'languages' => ['Portugais', 'Capverdien', 'Crioulo'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'José Maria Neves',
                        'startOfMandate' => '2021-11-09',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://www.financialafrik.com/wp-content/uploads/2016/10/Nives.jpg',
                    ]
                ]
            ],
            'Tchad' => [
                'flag' => 'chad.svg',
                'description'=>'',
                'countryThumbnail' => ['Tchad 1.jpg','Tchad 2.jpg','Tchad 3.jpg'],
                'cities' => ['N\'Djamena', 'Moundou', 'Sarh', 'Abéché'],
                'languages' => ['Français', 'Arabe', 'Sara'],
                'countryCode' => '235',
            ],
            'Cueta' => [
                'flag' => 'cueta.svg',
                // 'countryThumbnail' => ['Tchad 1.jpeg','Tchad 2.jpeg','Tchad 3.jpeg'],
                'description'=>'
                Ceuta, est une ville autonome espagnole sur la côte nord de l\'Afrique frontalière avec le Maroc. L\'exclave espagnole est, 
                comme sa voisine Melilla, située sur le continent africain, en face de la péninsule Ibérique, à environ quinze kilomètres
                 des côtes de la province espagnole de Cadix.',
                'countryCode' => '34',
                'cities' => ['Ceuta Centro', 'El Príncipe Alfonso', 'Benzú', 'El Sarchal', 'Monte Hacho'],
                'languages' => ['Espagnol'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Juan Jesús Vivas',
                        'startOfMandate' => '2001-02-07',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Juan_Jes%C3%BAs_Vivas_en_la_Convenci%C3%B3n_Nacional_del_Partido_Popular_%28enero_de_2011%29.jpg',
                    ]
                ]
            ],
            'Comores' => [
                'population'=> '850,886',
                'populationDensity' => '457',
                'area'=>'2.235',
                'gdp'=>'3.432 billion',
                'gdpNominal'=>'1,377',
                'flag' => 'comoros.svg',
                'countryCode' => '269',
                'description'=>'
                Les Comores sont un archipel volcanique situé au large de la côte est de l\'Afrique, dans les eaux chaudes du canal du Mozambique, 
                dans l\'océan Indien. La plus grande île de cet État-nation, Grande Comore (Ngazidja), est entourée de plages et roche volcanique
                 issue du volcan Karthala encore en activité. Dans la capitale, Moroni, des portes sculptées et une mosquée blanche à colonnades,
                  l\'Ancienne Mosquée du Vendredi, se répartissent autour du port et de la médina, en témoignage du passé arabe des îles
                ',
                'countryThumbnail' => ['Comores 1.jpg','Comores 2.jpg','Comores 3.jpg'],
                'cities' => ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Mirontsi'],
                'languages' => ['Comorien', 'Arabe', 'Français'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Azali Assoumani',
                        'startOfMandate' => '2002-05-26',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://pbs.twimg.com/profile_images/1094910246651396096/pz_1zGoG_400x400.jpg',
                    ]
                ]
            ],
            'République du Congo' => [
                'flag' => 'republic_of_the_congo.svg',
                'description'=>'
                La République du Congo, également appelée Congo-Brazzaville, est un pays d\'Afrique centrale dotée de réserves de forêts
                 tropicales abritant des gorilles. Sa capitale Brazzaville fait face à Kinshasa, la capitale de la République démocratique
                  du Congo, de l\'autre côté du fleuve Congo. Brazzaville compte plusieurs sites d\'intérêt, notamment les marchés
                   d\'artisanat traditionnels et la basilique Sainte-Anne, construite au milieu du XXe siècle et ornée d\'une flèche ainsi
                    que d\'un toit aux tuiles vertes',
                'countryCode' => '242',
                'countryThumbnail' => ['Republique du Congo 1.jpg','Republique du Congo 2.jpg','Republique du Congo 3.jpg'],
                'cities' => ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando', 'Impfondo', 'Sibiti', 'Kinkala'],
                'languages' => ['Français', 'Lingala', 'Kikongo'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Denis Sassou-Nguesso',
                        'startOfMandate' => '1979-02-08',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Denis_Sassou_Nguesso_2014.png',
                    ]
                ]
            ],
            'République démocratique du Congo' => [
                'flag' => 'democratic_Republic_of_the_congo.svg',
                'countryCode' => '242',
                'description'=>'
                La République démocratique du Congo, aussi appelée plus simplement RDC, Congo, RD Congo ou de manière informelle
                 Congo-Kinshasa, est un pays d\'Afrique centrale. C\'est le troisième pays le plus peuplé d\'Afrique, ainsi que le 
                 pays francophone le plus peuplé.
                ',
                'countryThumbnail' => ['Republique democratique du Congo 1.jpg','Republique democratique du Congo 2.jpg','Republique democratique du Congo 3.jpg'],
                'cities' => ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Goma', 'Bukavu', 'Kananga', 'Matadi', 'Kisangani', 'Bunia'],
                'languages' => ['Français', 'Lingala', 'Swahili', 'Tshiluba'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Félix Tshisekedi',
                        'startOfMandate' => '2019-01-24',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/9/92/F%C3%A9lix_Tshisekedi_-_2019_%28cropped%29.jpg',
                    ]
                ]
            ],
            'Côte d\'Ivoire' => [
                'flag' => 'cote_d\'ivoire.svg',
                'countryThumbnail' => ['Cote d\'Ivoire 1.jpg','Cote d\'Ivoire 2.jpg','Cote d\'Ivoire 3.jpg'],
                'cities' => ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San Pedro', 'Korhogo', 'Man', 'Séguéla', 'Divo', 'Gagnoa'],
                'countryCode' => '225',
                'languages' => ['Français', 'Baoulé', 'Bété', 'Sénoufo']
            ],
            'Djibouti' => [
                'flag' => 'djibouti.svg',
                'countryThumbnail' => ['Djibouti 1.jpg','Djibouti 2.jpg','Djibouti 3.jpg'],
                'cities' => ['Djibouti', 'Ali Sabieh', 'Tadjourah', 'Obock', 'Dikhil'],
                'languages' => ['Français', 'Arabe', 'Afar'],
                'countryCode' => '253',
            ],
            'Égypte' => [
                'flag' => 'egypt.svg',
                'countryThumbnail' => ['Egypte 1.jpg','Egypte 2.jpg','Egypte 3.jpg'],
                'cities' => ['Le Caire', 'Alexandrie', 'Gizeh', 'Louxor', 'Assouan', 'Port-Saïd', 'Suez', 'Ismaïlia'],
                'languages' => ['Arabe', 'Anglais'],
                'countryCode' => '20',
            ],
            'Gabon' => [
                'flag' => 'gabon.svg',
                'countryThumbnail' => ['Gabon 1.jpg','Gabon 2.jpg','Gabon 3.jpg'],
                'cities' => ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda', 'Mouila', 'Tchibanga', 'Koulamoutou'],
                'languages' => ['Français', 'Fang', 'Mbéré'],
                'countryCode' => '241',
            ],
            'Ghana' => [
                'flag' => 'ghana.svg',
                'countryThumbnail' => ['Ghana 1.jpg','Ghana 2.jpg','Ghana 3.jpg'],
                'cities' => ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Cape Coast', 'Sunyani', 'Tema', 'Bolgatanga'],
                'languages' => ['Anglais', 'Akan', 'Mole-Dagbon'],
                'countryCode' => '233',
            ],
            'Guinée' => [
                'flag' => 'guinea.svg',
                'countryThumbnail' => ['Guinee 1.webp','Guinee 2.jpg','Guinee 3.jpg'],
                'cities' => ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé', 'Mamou', 'Kamsar', 'Boke'],
                'languages' => ['Français', 'Poular', 'Malinké'],
                'countryCode' => '224',
            ],
            'Guinée-Bissau' => [
                'flag' => 'guinea-bissau.svg',
                'countryThumbnail' => ['Guinee-Bissau 1.jpg','Guinee-Bissau 2.jpg','Guinee-Bissau 3.jpg'],
                'cities' => ['Bissau', 'Bafatá', 'Gabú', 'Canchungo'],
                'languages' => ['Portugais', 'Crioulo'],
                'countryCode' => '245',
            ],
            'Guinée équatoriale' => [
                'flag' => 'equatorial_guinea.svg',
                'countryThumbnail' => ['Guinee equatoriale 1.jpg','Guinee equatoriale 2.jpg','Guinee equatoriale 3.webp'],
                'cities' => ['Malabo', 'Bata', 'Ebebiyin', 'Mongomo'],
                'languages' => ['Espagnol', 'Français'],
                'countryCode' => '240',
            ],
            'Kenya' => [
                'flag' => 'kenya.svg',
                'countryThumbnail' => ['Kenya 1.jpg','Kenya 2.jpg','Kenya 3.jpg'],
                'cities' => ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
                'languages' => ['Swahili', 'Anglais', 'Kikuyu'],
                'countryCode' => '254',
            ],
            'Lesotho' => [
                'flag' => 'lesotho.svg',
                'countryThumbnail' => ['Lesotho 1.jpeg','Lesotho 2.jpg','Lesotho 3.jpg'],
                'cities' => ['Maseru', 'Teyateyaneng', 'Leribe', 'Mafeteng'],
                'languages' => ['Sesotho', 'Anglais', 'Zoulou'],
                'countryCode' => '266',
            ],
            'Liberia' => [
                'flag' => 'liberia.svg',
                'countryThumbnail' => ['Liberia 1.jpg','Liberia 2.jpg','Liberia 3.jpg'],
                'cities' => ['Monrovia', 'Ganta', 'Buchanan', 'Kakata'],
                'languages' => ['Anglais'],
                'countryCode' => '231',
            ],
            'Libye' => [
                'flag' => 'libya.svg',
                'countryThumbnail' => ['Libye 1.jpg','Libye 2.jpg','Libye 3.jpeg'],
                'cities' => ['Tripoli', 'Benghazi', 'Misrata', 'Sirte'],
                'languages' => ['Arabe'],
                'countryCode' => '218',
            ],
            'Madagascar' => [
                'population'=> '28,812,195',
                'populationDensity' => '47.7',
                'area'=>'592,796',
                'gdp'=>'56.754 billion',
                'gdpNominal'=>'529',
                'flag' => 'madagascar.svg',
                'countryCode' => '261',
                'description'=>'
                Madagascar est une île immense et un pays situé au large de la côte sud-est de l\'Afrique. 
                Il abrite des milliers d\'espèces animales endémiques comme les lémuriens, ainsi que des forêts tropicales,
                 des plages et des récifs. À proximité de l\'effervescente capitale, Antananarivo,
                  se trouve la colline d\'Ambohimanga, un ensemble de palais royaux et de cimetières, 
                  ainsi que l\'Avenue des Baobabs, une route de terre bordée d\'arbres géants vieux de plusieurs siècles.
                  ',
                'countryThumbnail' => ['Madagascar 1.jpg','Madagascar 2.jpg','Madagascar 3.jpg'],
                'cities' => ['Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa', 'Diego', 'Mahajanga', 'Toliara'],
                'languages' => ['Malgache', 'Français'],
                'leaders' => [
                    [
                        'type' => 'President',
                        'name' => 'Andry Rajoelina',
                        'startOfMandate' => '2019-01-19',
                        'endOfMandate' => '',
                        'pdtImg' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Andry_Rajoelina_in_December_2022_%28cropped%29.jpg/220px-Andry_Rajoelina_in_December_2022_%28cropped%29.jpg',
                    ]
                ]
            ],
            'Malawi' => [
                'flag' => 'malawi.svg',
                'countryThumbnail' => ['Malawi 1.jpg','Malawi 2.jpg','Malawi 3.jpg'],
                'cities' => ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba'],
                'languages' => ['Chichewa', 'Anglais'],
                'countryCode' => '265',
            ],
            'Mali' => [
                'flag' => 'mali.svg',
                'countryThumbnail' => ['Mali 1.jpeg','Mali 2.jpg','Mali 3.jpg'],
                'cities' => ['Bamako', 'Sikasso', 'Mopti', 'Segou'],
                'languages' => ['Français', 'Bambara'],
                'countryCode' => '223',
            ],
            'Mauritanie' => [
                'flag' => 'mauritania.svg',
                'countryThumbnail' => ['Mauritanie 1.jpg','Mauritanie 2.jpg','Mauritanie 3.jpg'],
                'cities' => ['Nouakchott', 'Nouadhibou', 'Kaédi', 'Zouérat'],
                'languages' => ['Arabe'],
                'countryCode' => '222',
            ],
            'Maurice' => [
                'flag' => 'mauritius.svg',
                'countryThumbnail' => ['Maurice 1.jpg','Maurice 2.jpg','Maurice 3.jpg'],
                'cities' => ['Port-Louis', 'Beau-Bassin Rose-Hill', 'Vacoas-Phoenix', 'Curepipe'],
                'languages' => ['Français', 'Anglais', 'Créole mauricien'],
                'countryCode' => '230',
            ],
            'Maroc' => [
                'flag' => 'morocco.svg',
                'countryThumbnail' => ['Maroc 1.jpg','Maroc 2.jpg','Maroc 3.jpg'],
                'cities' => ['Rabat', 'Casablanca', 'Fès', 'Marrakech'],
                'languages' => ['Arabe', 'Berbère', 'Français'],
                'countryCode' => '212',
            ],
            'Mozambique' => [
                'flag' => 'mozambique.svg',
                'countryThumbnail' => ['Mozambique 1.jpg','Mozambique 2.jpg','Mozambique 3.jpg'],
                'cities' => ['Maputo', 'Matola', 'Beira', 'Nampula'],
                'languages' => ['Portugais', 'Emakhuwa'],
                'countryCode' => '258',
            ],
            'Namibie' => [
                'flag' => 'namibia.svg',
                'countryThumbnail' => ['Namibie 1.jpg','Namibie 2.jpg','Namibie 3.jpg'],
                'cities' => ['Windhoek', 'Rundu', 'Walvis Bay', 'Swakopmund'],
                'languages' => ['Anglais', 'Afrikaans', 'Oshiwambo'],
                'countryCode' => '264',
            ],
            'Niger' => [
                'flag' => 'niger.svg',
                'countryThumbnail' => ['Niger 1.webp','Niger 2.jpg','Niger 3.jpg'],
                'cities' => ['Niamey', 'Zinder', 'Maradi', 'Agadez'],
                'languages' => ['Français', 'Arabe', 'Hausa'],
                'countryCode' => '227',
            ],
            'Nigeria' => [
                'flag' => 'nigeria.svg',
                'countryThumbnail' => ['Nigeria 1.jpeg','Nigeria 2.jpg','Nigeria 3.jpg'],
                'cities' => ['Lagos', 'Kano', 'Ibadan', 'Abuja'],
                'languages' => ['Anglais', 'Yoruba', 'Hausa', 'Igbo'],
                'countryCode' => '234',
            ],
            'Ouganda' => [
                'flag' => 'uganda.svg',
                'countryThumbnail' => ['Ouganda 1.jpg','Ouganda 2.jpg','Ouganda 3.jpg'],
                'cities' => ['Kampala', 'Mbarara', 'Jinja', 'Gulu'],
                'languages' => ['Anglais', 'Swahili', 'Luganda'],
                'countryCode' => '256',
            ],
            'Rwanda' => [
                'flag' => 'rwanda.svg',
                'countryThumbnail' => ['Rwanda 1.webp','Rwanda 2.jpeg','Rwanda 3.jpg'],
                'cities' => ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri'],
                'languages' => ['Kinyarwanda', 'Anglais', 'Français'],
                'countryCode' => '250',
            ],
            'Sao Tomé-et-Principe' => [
                'flag' => 'sao_tome_and_principe.svg',
                'countryThumbnail' => ['Sao Tome-et-Principe 1.jpg','Sao Tome-et-Principe 2.jpeg','Sao Tome-et-Principe 3.jpg'],
                'cities' => ['São Tomé', 'Santo António', 'São João dos Angolares', 'Neves'],
                'languages' => ['Portugais'],
                'countryCode' => '239',
            ],
            'Sénégal' => [
                'flag' => 'senegal.svg',
                'countryThumbnail' => ['Senegal 1.jpg','Senegal 2.jpg','Senegal 3.jpg'],
                'cities' => ['Dakar', 'Thiès', 'Kaolack', 'Ziguinchor'],
                'languages' => ['Français', 'Wolof', 'Pulaar'],
                'countryCode' => '221',
            ],
            'Seychelles' => [
                'flag' => 'seychelles.svg',
                'countryThumbnail' => ['Seychelles 1.jpg','Seychelles 2.jpg','Seychelles 3.jpg'],
                'cities' => ['Victoria', 'Anse Boileau', 'Bel Ombre', 'Beau Vallon'],
                'languages' => ['Seychellois Creole', 'Anglais', 'Français'],
                'countryCode' => '248',
            ],
            'Sierra Leone' => [
                'flag' => 'sierra_leone.svg',
                'countryThumbnail' => ['Sierra Leone 1.jpg','Sierra Leone 2.jpg','Sierra Leone 3.jpg'],
                'cities' => ['Freetown', 'Bo', 'Kenema', 'Makeni'],
                'languages' => ['Anglais', 'Krio'],
                'countryCode' => '232',
            ],
            'Somalie' => [
                'flag' => 'somalia.svg',
                'countryThumbnail' => ['Somalie 1.jpg','Somalie 2.jpg','Somalie 3.jpg'],
                'cities' => ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo'],
                'languages' => ['Somali', 'Arabe'],
                'countryCode' => '252',
            ],
            'Afrique du Sud' => [
                'flag' => 'south_africa.svg',
                'countryThumbnail' => ['Afrique du Sud 1.jpg','Afrique du Sud 2.jpg','Afrique du Sud 3.jpg'],
                'cities' => ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'],
                'languages' => ['Afrikaans', 'Anglais', 'Zoulou', 'Xhosa'],
                'countryCode' => '27',
            ],
            'Soudan' => [
                'flag' => 'sudan.svg',
                'countryThumbnail' => ['Soudan 1.jpg','Soudan 2.jpg','Soudan 3.jpg'],
                'cities' => ['Khartoum', 'Omdurman', 'Port Sudan', 'Kassala'],
                'languages' => ['Arabe', 'Anglais'],
                'countryCode' => '249',
            ],
            'Soudan du Sud' => [
                'flag' => 'south_sudan.svg',
                'countryThumbnail' => ['Soudan du Sud 1.jpg','Soudan du Sud 2.jpg','Soudan du Sud 3.jpeg'],
                'cities' => ['Juba', 'Wau', 'Malakal', 'Bor'],
                'languages' => ['Anglais', 'Arabe'],
                'countryCode' => '211',
            ],
            'Eswatini' => [
                'flag' => 'eswatini.svg',
                'countryThumbnail' => ['Eswatini 1.jpg','Eswatini 2.jpg','Eswatini 3.jpg'],
                'cities' => ['Mbabane', 'Manzini', 'Big Bend', 'Malkerns'],
                'languages' => ['Swazi', 'Anglais'],
                'countryCode' => '268',
            ],
            'Tanzanie' => [
                'flag' => 'tanzania.svg',
                'countryThumbnail' => ['Tanzanie 1.jpg','Tanzanie 2.jpg','Tanzanie 3.jpg'],
                'cities' => ['Dodoma', 'Dar es Salaam', 'Mwanza', 'Arusha'],
                'languages' => ['Swahili', 'Anglais'],
                'countryCode' => '225',
            ],
            'Togo' => [
                'flag' => 'togo.svg',
                'countryThumbnail' => ['Togo 1.png','Togo 2.jpg','Togo 3.jpg'],
                'cities' => ['Lomé', 'Sokodé', 'Kara', 'Palimé'],
                'languages' => ['Français', 'Éwé', 'Kabyè'],
                'countryCode' => '228',
            ],
            'Tunisie' => [
                'flag' => 'tunisia.svg',
                'countryThumbnail' => ['Tunisie 1.jpg','Tunisie 2.jpg','Tunisie 3.jpg'],
                'cities' => ['Tunis', 'Sfax', 'Sousse', 'Kairouan'],
                'languages' => ['Arabe', 'Français'],
                'countryCode' => '216',
            ],
            'Zambie' => [
                'flag' => 'zambia.svg',
                'countryThumbnail' => ['Zambie 1.jpg','Zambie 2.jpg','Zambie 3.jpg'],
                'cities' => ['Lusaka', 'Ndola', 'Kitwe', 'Kabwe'],
                'languages' => ['Anglais', 'Bemba', 'Nyanja'],
                'countryCode' => '260',
            ],
            'Zimbabwe' => [
                'flag' => 'zimbabwe.svg',
                'countryThumbnail' => ['Zimbabwe 1.jpg','Zimbabwe 2.jpg','Zimbabwe 3.jpg'],
                'cities' => ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare'],
                'languages' => ['Anglais', 'Shona', 'Ndebele'],
                'countryCode' => '263',
            ],
            ];
            foreach ($countries as $name => $country) 
            {
                if (!is_array($country)) {
                    continue;
                }
            
                $pays = new Pays();
                if (isset($country['description'])) {
                    $pays->setDescription($country['description']);
                    if (isset($country['populationDensity'])) {
                        $pays->setPopulationDensity($country['populationDensity']);
                        if (isset($country['population'])) {
                            $pays->setPopulation($country['population']);
                            if (isset($country['gdp'])) {
                                $pays->setGdp($country['gdp']);
                                if (isset($country['gdpNominal'])) {
                                    $pays->setGdpNominal($country['gdpNominal']);
                                    if (isset($country['area'])) {
                                        $pays->setArea($country['area']);
                                    }
                                }
                            }
                        }
                    }
                }
                $pays->setName($name);
                $pays->setCountryCode($country['countryCode']);
                
                
            
                $flag = new Flag();
                $newPath = $newDir . '/' . $country['flag'];
                copy($imgDir . '/' . $country['flag'], $newPath);
                $flagFile = new UploadedFile($newPath, $country['flag'], null, null, true);
                $flag->setFile($flagFile);
                $pays->setFlag($flag);

                if (isset($country['countryThumbnail']) && is_array($country['countryThumbnail'])) {
                    foreach ($country['countryThumbnail'] as $thumbnailName) {
                        $countryThumbnail = new CountryThumbnail();
                        $newPathThumb = $newDirThumb . '/' . $thumbnailName;
                        copy($imgDirThumb . '/' . $thumbnailName, $newPathThumb);
                        $countryFile = new UploadedFile($newPathThumb, $thumbnailName, null, null, true);
                        $countryThumbnail->setFile($countryFile);
                        $countryThumbnail->setFolder('country');
                        $pays->addCountryThumbnail($countryThumbnail);

                        $manager->persist($countryThumbnail);
                    }
                }
                
            
                if (isset($country['languages']) && is_array($country['languages'])) 
                {
                    foreach ($country['languages'] as $language) {
                        $lang = new Language();
                        $lang->setLanguage($language);
                        $lang->addPay($pays);
                        
                        $manager->persist($lang);
                    }
                }
            
                $manager->persist($pays);
            
                if (isset($country['cities']) && is_array($country['cities']))
                {
                    foreach ($country['cities'] as $cityName) {
                        $city = new City();
                        $city->setName($cityName);
                        $city->setCountry($pays);
                        $manager->persist($city);
                    }
                }
                
            if (isset($country['leaders']) && is_array($country['leaders'])) 
                {
                    foreach ($country['leaders'] as $leaderData) {
                        $leader = new Leader();
                        $leader->setType($leaderData['type']);
                        $leader->setName($leaderData['name']);
                        $leader->setStartOfMandate(new \DateTime($leaderData['startOfMandate']));
                        $leader->setEndOfMandate(new \DateTime($leaderData['endOfMandate']));
                        $leader->setPdtImg($leaderData['pdtImg']);
                        $leader->setCountrie($pays);
                        $manager->persist($leader);
                    }
                }
            } 

        $jobGrades = [
            "jobGrades.Etudiant",
            "jobGrades.Junior",
            "jobGrades.Senior"
        ];
        $jobTypes = [
            "jobTypes.Temps plein",
            "jobTypes.Temps partiel",
            "jobTypes.CDI",
            "jobTypes.CDD",
            "jobTypes.Alternance",
            "jobTypes.Teletravail/Freelance",
            "jobTypes.Stage",
        ];
        $genders = [
            "genders.Homme",
            "genders.Femme",
            "genders.Autre"
        ];
        $companySizes = [
            "1-10",
            "10-30",
            "30-50",
            "50-100",
            "100+"
        ];
        $domains = [
            "domain.Technologie de l'information",
            "domain.Santé",
            "domain.Finance",
            "domain.Énergie",
            "domain.Transport",
            "domain.Éducation",
            "domain.Immobilier",
            "domain.Automobile",
            "domain.Agriculture",
            "domain.Alimentation et boissons",
            "domain.Mode",
            "domain.Tourisme",
            "domain.Divertissement",
            "domain.Télécommunications",
            "domain.Assurance",
            "domain.Construction",
            "domain.Industrie pharmaceutique",
            "domain.Logistique",
            "domain.Marketing",
            "domain.Médias",
            "domain.Aérospatiale",
            "domain.Hôtellerie",
            "domain.Consulting",
            "domain.Services juridiques",
            "domain.Biotechnologie",
            "domain.Environnement",
            "domain.Sport",
            "domain.Chimie",
            "domain.Engénierie",
            "domain.Gestion des déchets",
            "domain.Électronique",
            "domain.Agence immobilière",
            "domain.Sécurité",
            "domain.Gestion des ressources humaines",
            "domain.Services financiers",
            "domain.Joaillerie",
            "domain.Agroalimentaire",
            "domain.Audiovisuel",
            "domain.Arts",
            "domain.Audio",
            "domain.Tabac",
            "domain.Equipements médicaux",
            "domain.Edition",
            "domain.Evénementiel",
            "domain.Services gouvernementaux",
            "domain.Textile",
            "domain.Architecture",
            "domain.Restauration",
            "domain.Equipements sportifs",
            "domain.Electronique grand public",
            "domain.Jouets",
            "domain.Pétrole et gaz",
            "domain.Equipements industriels",
            "domain.Education supérieure",
            "domain.Papeterie",
            "domain.Equipements de bureau",
            "domain.Artisanat",
            "domain.Equipements de loisirs",
            "domain.Photographie",
            "domain.Assistance technique",
            "domain.Matériaux de construction",
            "domain.Santé animale",
            "domain.Vins et spiritueux",
            "domain.Formation en ligne",
            "domain.Fabrication",
            "domain.Services internet",
            "domain.Energie renouvelable",
            "domain.Equipements agricoles",
            "domain.Energie solaire",
            "domain.Amenagement paysager",
            "domain.Bijouterie",
            "domain.Horlogerie",
            "domain.Jeux vidéo",
            "domain.Services sociaux",
            "domain.Plomberie",
            "domain.Equipements audiovisuels",
            "domain.Equipements de sécurité",
            "domain.Mobilier",
            "domain.Cinéma",
            "domain.Electronique automobile",
            "domain.Equipements de cuisine",
            "domain.Design",
            "domain.Jardinerie",
            "domain.Restauration rapide",
            "domain.Reparation automobile",
            "domain.Equipements de plongée",
            "domain.Publicité",
            "domain.Informatique",
            "domain.Produits chimiques de nettoyage",
            "domain.Habillement de travail",
            "domain.Equipements de camping",
            "domain.Edition en ligne",
            "domain.Equipements de pêche",
            "domain.Equipements de golf",
            "domain.Equipements de paintball",
            "domain.Equipements de cyclisme",
            "domain.Equipements de natation",
            "domain.Equipements de ski",
        ];

        $companyTypes = [
            "companyType.Startup",
            "companyType.Entreprise individuelle",
            "companyType.Société anonyme (SA)",
            "companyType.Société à responsabilité limitée (SARL)",
            "companyType.Entreprise familiale",
            "companyType.Entreprise publique",
            "companyType.Coopérative",
            "companyType.Association",
            "companyType.Entreprise sociale",
            "companyType.Entreprise multinationale",
            "companyType.Entreprise artisanale",
            "companyType.Entreprise innovante",
            "companyType.Entreprise technologique",
            "companyType.Entreprise de services",
            "companyType.Entreprise manufacturière",
            "companyType.Entreprise de vente au détail",
            "companyType.Entreprise en ligne",
            "companyType.Entreprise de conseil",
            "companyType.Entreprise de construction",
            "companyType.Entreprise agroalimentaire",
            "companyType.Entreprise pharmaceutique",
            "companyType.Entreprise de logistique",
            "companyType.Entreprise de transport",
            "companyType.Entreprise de médias",
            "companyType.Entreprise de divertissement",
            "companyType.Entreprise de télécommunications",
            "companyType.Entreprise d'énergie",
            "companyType.Entreprise de gestion des déchets",
            "companyType.Entreprise d'ingénierie",
            "companyType.Entreprise de sécurité",
            "companyType.Entreprise de recyclage",
            "companyType.Entreprise d'architecture",
            "companyType.Entreprise de design",
            "companyType.Entreprise de développement web",
            "companyType.Entreprise de marketing numérique",
            "companyType.Entreprise de formation en ligne",
            "companyType.Entreprise de tourisme",
            "companyType.Entreprise de restauration",
            "companyType.Entreprise de construction navale",
            "companyType.Entreprise de vente en gros",
            "companyType.Entreprise de technologie propre",
            "companyType.Entreprise de recyclage électronique",
            "companyType.Entreprise sociale et solidaire",
            "companyType.Entreprise culturelle",
            "companyType.Entreprise d'art et de design",
            "companyType.Entreprise humanitaire",
            "companyType.Entreprise de recherche et développement",
            "companyType.Entreprise de sécurité informatique",
            "companyType.Entreprise de génie civil",
            "companyType.Entreprise de gestion des ressources humaines",
            "companyType.Entreprise de conseil en gestion",
            "companyType.Entreprise de fabrication de produits chimiques",
            "companyType.Entreprise de fabrication d'équipements médicaux",
            "companyType.Entreprise de mode éthique",
            "companyType.Entreprise d'éducation",
            "companyType.Entreprise d'architecture d'intérieur",
            "companyType.Entreprise de conception de jeux vidéo",
            "companyType.Entreprise de gestion d'événements",
            "companyType.Entreprise de conception graphique",
            "companyType.Entreprise de développement durable",
            "companyType.Entreprise de conception de logiciels",
            "companyType.Entreprise de gestion de projet",
            "companyType.Entreprise de développement mobile",
            "companyType.Entreprise de commerce électronique",
            "companyType.Entreprise de sécurité alimentaire",
            "companyType.Entreprise de fabrication de meubles",
            "companyType.Entreprise de design d'expérience utilisateur",
            "companyType.Entreprise de développement durable",
            "companyType.Entreprise de téléphonie mobile",
            "companyType.Entreprise de services financiers",
            "companyType.Entreprise de production audiovisuelle",
            "companyType.Entreprise de gestion immobilière",
            "companyType.Entreprise de restauration rapide",
            "companyType.Entreprise de santé et de bien-être",
            "companyType.Entreprise de cosmétiques",
            "companyType.Entreprise de gestion de projet",
            "companyType.Entreprise de développement de jeux éducatifs",
            "companyType.Entreprise de fabrication de matériaux de construction",
            "companyType.Entreprise de gestion des ressources naturelles",
            "companyType.Entreprise de fabrication de produits électroniques",
            "companyType.Entreprise de fabrication de textiles",
            "companyType.Entreprise de conception de logiciels",
            "companyType.Entreprise de commerce de gros",
            "companyType.Entreprise de fabrication de produits alimentaires",
            "companyType.Entreprise de développement de logiciels",
            "companyType.Entreprise de vente au détail en ligne",
            "companyType.Entreprise de transport de marchandises",
            "companyType.Entreprise de commerce équitable",
            "companyType.Entreprise de gestion de l'eau",
            "companyType.Entreprise de fabrication de jouets",
            "companyType.Entreprise de fabrication de produits pharmaceutiques",
            "companyType.Entreprise de gestion des médias sociaux",
            "companyType.Entreprise de gestion des déchets électroniques",
            "companyType.Entreprise de fabrication de vêtements de sport",
            "companyType.Entreprise de production cinématographique",
            "companyType.Entreprise de production de musique",
            "companyType.Entreprise de production de jeux vidéo",
            "companyType.Entreprise de conception de logiciels de gestion",
            "companyType.Entreprise de gestion de la chaîne d'approvisionnement",
        ];

        $currencies = [
            "US Dollar" => [
                "symbol" => "$",
                "code" => "USD"
            ],
            "Euro" => [
                "symbol" => "€",
                "code" => "EUR"
            ],
            "Japanese Yen" => [
                "symbol" => "¥",
                "code" => "JPY"
            ],
            "British Pound Sterling" => [
                "symbol" => "£",
                "code" => "GBP"
            ],
            "Ariary Malagasy" => [
                "symbol" => "Ar",
                "code" => "MGA"
            ],
            "Australian Dollar" => [
                "symbol" => "A$",
                "code" => "AUD"
            ],
            "Canadian Dollar" => [
                "symbol" => "CA$",
                "code" => "CAD"
            ],
            "Swiss Franc" => [
                "symbol" => "CHF",
                "code" => "CHF"
            ],
            "Chinese Yuan" => [
                "symbol" => "¥",
                "code" => "CNY"
            ],
            "Swedish Krona" => [
                "symbol" => "kr",
                "code" => "SEK"
            ],
            "Norwegian Krone" => [
                "symbol" => "kr",
                "code" => "NOK"
            ],
            "Indian Rupee" => [
                "symbol" => "₹",
                "code" => "INR"
            ],
            "Brazilian Real" => [
                "symbol" => "R$",
                "code" => "BRL"
            ],
            "South African Rand" => [
                "symbol" => "R",
                "code" => "ZAR"
            ],
            "Mexican Peso" => [
                "symbol" => "Mex$",
                "code" => "MXN"
            ],
            // Ajoutez d'autres devises selon vos besoins
        ];
        $equipments_hotel = 
        [
            "equipments_hotel.Wi-Fi",
            "equipments_hotel.Television",
            "equipments_hotel.Climatisation",
            "equipments_hotel.Minibar",
            "equipments_hotel.Coffre-fort",
            "equipments_hotel.Sèche-cheveux",
            "equipments_hotel.Fer et planche à repasser",
            "equipments_hotel.Machine à café",
            "equipments_hotel.bouilloire",
            "equipments_hotel.Téléphone",
            "equipments_hotel.Radio-réveil",
            "equipments_hotel.Baignoire ou douche",
            "equipments_hotel.Miroir de maquillage",
            "equipments_hotel.Ventilateur",
            "equipments_hotel.Articles de toilette",
            "equipments_hotel.Table et chaises",
            "equipments_hotel.Fournitures de bureau",
            "equipments_hotel.Moustiquaires",
            "equipments_hotel.Porte-bagages",
            "equipments_hotel.Lampes de lecture",
            "equipments_hotel.Réfrigérateur",
            "equipments_hotel.Lave-linge et sèche-linge",
            "equipments_hotel.Salle de sport",
            "equipments_hotel.Restaurant",
            "equipments_hotel.Piscine",
            "equipments_hotel.Bar",
            "equipments_hotel.Salle de conference",
            "equipments_hotel.Salle de reunion" 
        ];
        $equipments_accomodations = 
        [
            "equipments_accomodations.Wi-Fi",
            "equipments_accomodations.Television",
            "equipments_accomodations.Climatisation",
            "equipments_accomodations.Coffre-fort",
            "equipments_accomodations.Fer et planche à repasser",
            "equipments_accomodations.Machine à café",
            "equipments_accomodations.Bouilloire",
            "equipments_accomodations.Téléphone",
            "equipments_accomodations.Radio-réveil",
            "equipments_accomodations.Ventilateur",
            "equipments_accomodations.Articles de toilette",
            "equipments_accomodations.Table et chaises",
            "equipments_accomodations.Fournitures de bureau",
            "equipments_accomodations.Moustiquaires",
            "equipments_accomodations.Porte-bagages",
            "equipments_accomodations.Lampes de lecture",
            "equipments_accomodations.Réfrigérateur"
        ];
        $equipments_bathroom = 
        [
            "equipments_bathroom.Sèche-cheveux",
            "equipments_bathroom.Baignoire ou douche",
            "equipments_bathroom.Miroir de maquillage",
            "equipments_bathroom.Articles de toilette"
        ];
        $servicesHotel = 
        [
            "servicesHotel.Restauration",
            "servicesHotel.Blanchisserie",
            "servicesHotel.Nettoyage à sec",
            "servicesHotel.Conciergerie",
            "servicesHotel.Navette aéroport",
            "servicesHotel.Centre d'affaires",
            "servicesHotel.Salles de réunion",
            "servicesHotel.Activités pour enfants",
            "servicesHotel.Spa et Bien-être",
            "servicesHotel.Services de transport",
            "servicesHotel.Services médicaux",
            "servicesHotel.Services de mariage et Événements",
            "servicesHotel.Services de sécurité"
        ];
        
        $thingstoDos=
        [
            "Visites guidées et circuits spéciaux",
            "Rencontres avec des personnages",
            "Activités éducatives",
            "Interactions avec la faune",
            "Exploration des expositions",
            "Spectacles et représentations",
            "Dégustation de produits locaux",
            "Tours de Manège",
            "Dévaler les toboggans aquatiques",
            "Rencontrer des héros dans des zones basées sur des franchises célèbres",
            "Parcourir les boutiques a souvenir",
            "Se détendre dans les espaces verts et ombragés",
            "Examiner les artefacts historiques",
            "Explorer des thèmes spécifiques lors de séminaires",
            "Acquérir des livres et des publications sur les expositions",
            "Participer à des jeux d'eau interactifs",
            "Affronter les vagues dans la piscine à vagues",
            "Jouer au water-polo",
        ];
        $products=
        [
            "Vetements",
            "Chaussures"
        ];
        $cuisineType = 
        [
            "Cuisine française",
            "Cuisine italienne",
            "Cuisine méditerranéenne",
            "Cuisine mexicaine",
            "Cuisine américaine",
            "Cuisine indienne",
            "Cuisine thaïlandaise",
            "Cuisine chinoise",
            "Cuisine japonaise",
            "Cuisine locale"
        ];
        $restaurantType =
        [
            "Restaurant simple",
            "Desserts",
            "Thé et café",
            "Bars/pubs",
            "Boulangeries-patisserie",
            "Escale"
        ];
        $restaurantServices = 
        [
            "Livraison",
            "plats à emporter",
            "Reservation",
            "Traiteur",
            "Événements privés",
            "Traiteur pour occasions spéciales",
            "Commande en ligne",
            "Service au volant",
            "Service à table",
            "Bar à cocktails",
            "Musique live",
            "Terrasse extérieure",
            "Wi-Fi",
            "Happy Hour"
        ];
        $menuCategory = 
        [
            "Entrées",
            "Plats principaux",
            "Desserts",
            "Boissons",
            "Collations",
            "Salades",
            "grillades",
            "Soupes et potages",
            "Sandwichs ",
            "Plats végétariens",
            "Plats sans gluten",
            "Plats sans produits laitiers",
            "Plats de fruits de mer",
            "spécialités",
            "Plats pour enfants",
            "Plats du chef",
            "recommandations spéciales"
        ];
        $typeBreakfast = 
        [
            "Petit déjeuner continental",
            "Petit déjeuner américain",
            "Petit déjeuner britannique",
            "Petit déjeuner méditerranéen",
            "Petit déjeuner asiatique",
            "Petit déjeuner rapide",
            "Petit déjeuner végétalien ou végétarien"
        ];
        $servicesAccomodation=
        [
            "Service de nettoyage quotidien",
            "Room service de repas",
            "Service de blanchisserie",
            "Service de réveil",
            "Service de préparation de lit",
            "Service de conciergerie privée",
            "Service de coffre-fort",
            "Service de divertissement en chambre",
            "Service de fourniture de produits de toilette",
        ];
        
        foreach($menuCategory as $value)
        {
            $menuCategory = new MenuCategory();
            $menuCategory -> setMenuTitle($value);
            $manager->persist($menuCategory);
        }
        foreach($restaurantServices as $value)
        {
            $restaurantService = new RestaurantService();
            $restaurantService -> setTitle($value);
            $manager->persist($restaurantService);
        }
        foreach($typeBreakfast as $value)
        {
            $typeBreakfast = new TypeBreakfast();
            $typeBreakfast -> setName($value);
            $manager ->persist($typeBreakfast);
        }
        foreach($restaurantType as $value)
        {
            $restaurantType = new RestaurantType();
            $restaurantType ->setTitle($value);
            $manager->persist($restaurantType);
        }

        foreach($cuisineType as $value)
        {
            $cuisineType = new CuisineType();
            $cuisineType->setCuisineTitle($value);
            $manager->persist($cuisineType);
        }
        foreach($servicesHotel as $value)
        {
            $services = new HotelService();
            $services->setTitle($value);
            $services->setDescription("description ".$value);
            $services->setPrice(rand(10,20));
            $manager->persist($services);
        }
        foreach($servicesAccomodation as $value)
        {
            $services = new AccomodationService();
            $services->setTitle($value);
            $services->setDescription("description ".$value);
            $services->setPrice(rand(10,20));
            $manager->persist($services);
        }
        
        foreach($equipments_hotel as $value)
        {
            $equipmentsHotel = new HotelEquipment();
            $equipmentsHotel->setEquipmentTitle($value);
            $equipmentsHotel->setDescription("description ".$value);
            $manager->persist($equipmentsHotel);
        }

        foreach($equipments_accomodations as $value)
        {
            $equipmentsAccomodation = new AccomodationEquipment();
            $equipmentsAccomodation->setEquipmentTitle($value);
            $equipmentsAccomodation->setDescription("description ".$value);
            $manager->persist($equipmentsAccomodation);
        }

        foreach($equipments_bathroom as $value)
        {
            $equipmentsBathroom = new BathroomEquipment();
            $equipmentsBathroom->setEquipmentTitle($value);
            $equipmentsBathroom->setDescription("description ".$value);
            $manager->persist($equipmentsBathroom);
        }

        foreach($thingstoDos as $value)
        {
            $thingstoDo = new ThingsToDo();
            $thingstoDo->setNameThings($value);
            $manager->persist($thingstoDo);
        }
        
        foreach ($jobGrades as $value) {
            $jobGrade = new JobGrade();
            $jobGrade->setTitle($value);
            $manager->persist($jobGrade);
        }
        
        foreach ($jobTypes as $value) {
            $jobType = new JobType();
            $jobType->setTitle($value);
            $manager->persist($jobType);
        }
        foreach ($genders as $value) {
            $genders = new Gender();
            $genders->setTitle($value);
            $manager->persist($genders);
        }
        foreach ($companySizes as $value) {
            $companySize = new CompanySize();
            $companySize->setSize($value);
            $manager->persist($companySize);
        }
        foreach ($domains as $value) {
            $domain = new Domain();
            $domain->setTitle($value);
            $manager->persist($domain);
        }
        foreach ($companyTypes as $value) {
            $companyType = new CompanyType();
            $companyType->setType($value);
            $manager->persist($companyType);
        }
        foreach ($currencies as $name=>$c) {
            $currency = new Currency();
            $currency->setName($name);
            $currency->setCode($c["code"]);
            $currency->setSymbol($c["symbol"]);
            $manager->persist($currency);
        }
        foreach ($domains as $d) {
            $domain = new Domain();
            $domain->setName($d);
            $manager->persist($domain);
        }
        foreach ($companyTypes as $c) {
            $companyType = new CompanyType();
            $companyType->setName($c);
            $manager->persist($companyType);
        }

        

        $manager->flush();
    }
}