clinicaApp
//------------------------------
// TODO: API menu
// por lo pronto colocar aqui el menu para su Modelo, vease test1
//------------------------------
.factory("menuService", [
  '$location',
  '$rootScope',
  '$http',
  '$window',
  function($location, $rootScope, $http, $window) {

    var version = {};

    var sections = [
    {
      name: 'Inicio',
      state: 'Inicio',
      url: '/Inicio',
      type: 'link'
    }

    ];
    /*
    var sections = [
    {
      name: 'Getting Started',
      state: 'getting-started',
      url: '/getting-started',
      type: 'link'
    }

    ];
    */
    sections.push({
        name: 'CAJA',
        type: 'toggle',
        pages: [
        {
          name : 'Cajaingreso',
          state: 'Cajaingreso',
          url: '/Cajaingreso',
          type: 'link'
        },
        {
          name : 'Cajaegreso',
          state: 'Cajaegreso',
          url: '/Cajaegreso',
          type: 'link'
        }
        ]
    });
    sections.push({
        name: 'CITAS',
        type: 'toggle',
        pages: [
        {
          name : 'Citainscripcion',
          state: 'Citainscripcion',
          url: '/Citainscripcion',
          type: 'link'
        },
        {
          name : 'Citahistorial',
          state: 'Citahistorial',
          url: '/Citahistorial',
          type: 'link'
        }
        ]
    });
    sections.push({
        name: 'CLIENTES',
        type: 'toggle',
        pages: [
        {
          name : 'Cliente',
          state: 'Cliente',
          url: '/Cliente',
          type: 'link'
        },
        {
          name : 'Cuentausuario',
          state: 'Cuentausuario',
          url: '/Cuentausuario',
          type: 'link'
        }
        ]
    });
    sections.push({
        name: 'ESPECIALIDADES',
        type: 'toggle',
        pages: [
        {
          name : 'Especialidad',
          state: 'Especialidad',
          url: '/Especialidad',
          type: 'link'
        }
        ]
    });

    sections.push({
        name: 'ODONTOLOGOS',
        type: 'toggle',
        pages: [
        {
          name : 'Odontologo',
          state: 'Odontologo',
          url: '/Odontologo',
          type: 'link'
        }
        ]
    });

    function sortByName(a,b) {
      return a.name < b.name ? -1 : 1;
    }

    var self;

    $rootScope.$on('$locationChangeSuccess', onLocationChange);



    return self = {
      version   :  version,
      sections  : sections,

      selectSection: function(section) {
        self.openedSection = section;
      },
      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function(section) {
        return self.openedSection === section;
      },

      selectPage: function(section, page) {
        self.currentSection = section;
        self.currentPage = page;
      },
      isPageSelected: function(page) {
        return self.currentPage === page;
      }
    };

    function sortByHumanName(a,b) {
      return (a.humanName < b.humanName) ? -1 :
      (a.humanName > b.humanName) ? 1 : 0;
    }

    function onLocationChange() {
      var path = $location.path();
      var introLink = {
        name: "CLINICA ODONTOLOGICA FE SALUD",
        //name: "Introduction",
        url:  "/",
        type: "link"
      };

      if (path == '/') {
        self.selectSection(introLink);
        self.selectPage(introLink, introLink);
        return;
      }

      var matchPage = function(section, page) {
        if (path === page.url) {
          self.selectSection(section);
          self.selectPage(section, page);
        }
      };

      sections.forEach(function(section) {
        if(section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if(section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });
    }
  }]);