import angular from "angular";
import { productHelper } from "utils/helper";

const images = {
  videoResetMovie:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/color accuracy movie_pid-1_cid-1_tid-1.jpg",
  videoResetStandard:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/color accuracy standard.jpg",
  residualDistortion1:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/crossover distortion 10kx sample.jpg",
  residualDistortion2:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/crossover distortion 10kx sample pic 2.jpg",
  speakerAgent:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/promedia-2.1-bluetooth-3.jpg",
  tvAgent:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/samsung 65mu9000.jpg",
  ampliAgent:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/marantz mm7025.jpg",
  powerStudioAgent:
    "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/jbl_lsr308_front_r.jpg"
};

export default angular
  .module("app.services.mockDataService", [])
  .service("mockDataService", function() {
    "ngInject";
    var mockData = {
      homeData: {
        image:
          "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/top landing page bg.png",
        styleText: null,
        styleButton: null,
        items: [
          {
            area: "Link",
            pid: null,
            link: "about-page",
            image:
              "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/1 introducing.png",
            text1: "Introducing",
            text2: "THX Labs",
            text3: null,
            styleText: "color:white; text-shadow: 2px 2px 8px #000000;",
            styleImage: null,
            styleBg: null
          },
          {
            area: "Link",
            pid: null,
            link: "explore-products-page",
            image:
              "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/2 database image.png",
            text1: "Explore the",
            text2: "Audio and Video",
            text3: "products database",
            styleText: "color:white; text-shadow: 2px 2px 8px #000000;",
            styleImage: null,
            styleBg: null
          },
          {
            area: "Product",
            pid: 1,
            link: null,
            image:
              "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/samsung 65mu9000-2.jpg",
            text1: null,
            text2: "Samsung UN65MU9000",
            text3: "Measurements",
            styleText: "color:white; text-shadow: 2px 2px 8px #000000;",
            styleImage: "max-height: 90%; min-height: 0px; margin-top:20px",
            styleBg: "background-color: white;"
          },
          {
            area: "Product",
            pid: 11,
            link: null,
            image:
              "http://apps.thx.com/THXData/Content/Upload/THXMark/Images/marantz mm7025.jpg",
            text1: null,
            text2: "Marantz MM7025",
            text3: "Measurements",
            styleText: "color:white; text-shadow: 2px 2px 8px #000000; ",
            styleImage:
              "object-fit:cover; min-height:70%; width: 100%; position: relative; top: 50%; transform: perspective(1px) translateY(-50%); ",
            styleBg: "background-color: white;"
          }
        ]
      },
      featureProduct: {
        type: 0,
        brand: "",
        products: []
      },
      productType: {
        types: [
          {
            id: 37,
            name: "Amplifiers",
            image1:
              "http://apps.thx.com/THXData/Content/Upload/Images/amplifier-black.png",
            image2:
              "http://apps.thx.com/THXData/Content/Upload/Images/amplifier-white.png",
            featuredProductID: 11,
            minMSRP: 0,
            maxMSRP: 2000
          },
          {
            id: 38,
            name: "PC Speakers",
            image1:
              "http://apps.thx.com/THXData/Content/Upload/Images/pcspeakers-black.png",
            image2:
              "http://apps.thx.com/THXData/Content/Upload/Images/pcspeakers-white.png",
            featuredProductID: 5,
            minMSRP: 100,
            maxMSRP: 2000
          },
          {
            id: 40,
            name: "Powered Studio Monitors",
            image1:
              "http://apps.thx.com/THXData/Content/Upload/Images/studiomon-black.png",
            image2:
              "http://apps.thx.com/THXData/Content/Upload/Images/studiomon-white.png",
            featuredProductID: 7,
            minMSRP: 400,
            maxMSRP: 1800
          },
          {
            id: 39,
            name: "TV",
            image1:
              "http://apps.thx.com/THXData/Content/Upload/Images/monitor-black.png",
            image2:
              "http://apps.thx.com/THXData/Content/Upload/Images/monitor-white.png",
            featuredProductID: 1,
            minMSRP: 1100,
            maxMSRP: 3000
          }
        ],
        minMSRP: 0,
        maxMSRP: 3000
      },
      productBrand: [
        {
          type: 37,
          brands: [
            {
              id: 38,
              name: "Marantz"
            },
            {
              id: 39,
              name: "Cambridge Audio"
            },
            {
              id: 40,
              name: "NAD"
            },
            {
              id: 41,
              name: "Monoprice"
            },
            {
              id: 42,
              name: "ATI"
            },
            {
              id: 43,
              name: "Yamaha"
            },
            {
              id: 44,
              name: "Rotel"
            },
            {
              id: 45,
              name: "Lexicon"
            },
            {
              id: 46,
              name: "Anthem"
            }
          ]
        },
        {
          type: 38,
          brands: [
            {
              id: 20,
              name: "Klipsch"
            },
            {
              id: 21,
              name: "Harman Kardon"
            },
            {
              id: 22,
              name: "Bose"
            },
            {
              id: 23,
              name: "PSB"
            },
            {
              id: 24,
              name: "Creative"
            },
            {
              id: 25,
              name: "Altec Lansing"
            },
            {
              id: 26,
              name: "Arion Legacy"
            },
            {
              id: 27,
              name: "Cyber Acoustics"
            },
            {
              id: 28,
              name: "Edifier"
            }
          ]
        },
        {
          type: 39,
          brands: [
            {
              id: 13,
              name: "Samsung"
            },
            {
              id: 14,
              name: "Vizio"
            },
            {
              id: 15,
              name: "Sony"
            },
            {
              id: 16,
              name: "TCL"
            },
            {
              id: 17,
              name: "LG"
            },
            {
              id: 18,
              name: "Hisense"
            },
            {
              id: 19,
              name: "Element"
            }
          ]
        },
        {
          type: 40,
          brands: [
            {
              id: 29,
              name: "JBL"
            },
            {
              id: 30,
              name: "Sony"
            },
            {
              id: 31,
              name: "Atlantic Technology"
            },
            {
              id: 32,
              name: "Genelec"
            },
            {
              id: 33,
              name: "Audioengine"
            },
            {
              id: 34,
              name: "Edifier"
            },
            {
              id: 35,
              name: "Vanatoo"
            },
            {
              id: 36,
              name: "Mackie"
            },
            {
              id: 37,
              name: "Yamaha"
            }
          ]
        }
      ],
      productData: []
    };

    function createProduct(opt) {
      var type = opt.type || {};
      var brand = opt.brand || {};
      var id = Number.parseInt(_.uniqueId());
      var typeName = getTypeById(type.id);
      typeName = typeName && typeName.name;
      var brandName = "";

      var l = getBrandOfType(type.id),
        o = _.find(l, item => item.id === brand.id);
      brandName = o.name;

      var image = null;
      if (type.id === 37) {
        image = images.ampliAgent;
      } else if (type.id === 38) {
        image = images.speakerAgent;
      } else if (type.id === 39) {
        image = images.tvAgent;
      } else if (type.id === 40) {
        image = images.powerStudioAgent;
      }

      var shape = {
        id: id,
        type: type.id,
        brand: brand.id,
        typeName,
        brandName,
        model: type.name + " " + brand.name + " " + id,
        shortDesc: "[MOCK Desc] Short desc ..... " + id,
        longDesc: "[MOCK Desc] Long desc ........... " + id,
        msrp: _.random(500, 1500).toString(),
        roomSize: "small",
        image: image,
        weblink: "http://.../page.html",
        thxCertified: "yes",
        specification: {
          features: [
            {
              name: "2 channel power amplifier",
              value: "Yes"
            },
            {
              name: "170 watts x 2 into 6 ohms",
              value: "Yes"
            },
            {
              name: "Frequency response: 8100,000 Hz (±3 dB)",
              value: "Yes"
            },
            {
              name: "Signaltonoise ratio: 105 dB",
              value: "Yes"
            },
            {
              name: "Discrete Current Feedback circuit for accurate",
              value: "Yes"
            },
            {
              name: "Oversized power transformer for high current levels",
              value: "Yes"
            },
            {
              name: "One RCA and one XLR input for each channel",
              value: "Yes"
            },
            {
              name: "DC trigger input/output",
              value: "Yes"
            },
            {
              name: "IR flasher input",
              value: "Yes"
            },
            {
              name: "Goldplated binding post speaker terminals",
              value: "Yes"
            },
            {
              name: "Detachable power cord",
              value: "Yes"
            },
            {
              name: "Weight: 23.8 lbs.",
              value: "Yes"
            },
            {
              name: "Warranty: 3 years",
              value: "Yes"
            }
          ]
        },
        overallScore: _.random(10, 100),
        scoreTitle: "Video Preset: Movie",
        scores: {
          scores: _.times(5, () => ({
            name: _.uniqueId("Score "),
            score: _.random(40, 99)
          }))
        },
        measurements: [
          {
            category: "Measurement 1",
            desc: "The description for this category",
            items: [
              {
                name: "Video Preset: Movie",
                image: images.videoResetMovie,
                compare: true
              },
              {
                name: "Measurement 2",
                image: images.videoResetStandard,
                compare: false
              }
            ]
          },
          {
            category: "Measurement 2",
            desc: "The description for this category",
            items: [
              {
                name: "Residual Distortion 1",
                image: images.residualDistortion1,
                compare: true
              },
              {
                name: "Residual Distortion 2",
                image: images.residualDistortion2,
                compare: false
              }
            ]
          }
        ]
      };

      return productHelper(shape);
    }

    function getTypeById(id) {
      return _.find(mockData.productType.types, type => type.id === id);
    }

    function getBrandOfType(type) {
      var found = _.find(mockData.productBrand, function(item) {
        return item.type === type;
      });
      return found.brands || [];
    }

    function buildListProduct() {
      var products = [];
      var types = mockData.productType.types;
      types.forEach(function(type) {
        var brands = getBrandOfType(type.id);
        brands.forEach(function(brand) {
          products.push(createProduct({ type: type, brand: brand }));
        });
      });
      return products;
    }

    let productList = buildListProduct();
    mockData.productData.length === 0 && (mockData.productData = productList);
    if (mockData.featureProduct.products.length === 0) {
      let rs = [];

      mockData.productType.types.forEach(type => {
        for (let i in productList) {
          let product = productList[i];
          if (product.type === type.id) {
            rs.push(product);
            break;
          }
        }
      });
      mockData.featureProduct.products = [...rs];
    }
    return mockData;
  });
