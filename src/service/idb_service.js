import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
    const tblStudent = {
        name: 'Students',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            gender: {
                dataType: DATA_TYPE.String,
                default: 'male'
            },
            country: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            city: {
                dataType: DATA_TYPE.String,
                notNull: true
            }
        }
    };

    const tblSites = {
        name: 'sites',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            siteTypeId: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            siteSubTypeId: {
                dataType: DATA_TYPE.Number
            },
            address1: {
                dataType: DATA_TYPE.String
            },
            address2: {
                dataType: DATA_TYPE.String
            },
            street: {
                dataType: DATA_TYPE.String
            },
            zipcode: {
                dataType: DATA_TYPE.String
            },
            stateId: {
                dataType: DATA_TYPE.Number
            },
            countryId: {
                dataType: DATA_TYPE.Number
            },
            cityId: {
                dataType: DATA_TYPE.Number
            },
            geometryType: {
                dataType: DATA_TYPE.String
            },
            zoneId: {
                dataType: DATA_TYPE.Number
            },
            latitude: {
                dataType: DATA_TYPE.String
            },
            longitude: {
                dataType: DATA_TYPE.String
            },
            pointLatLong: {
                dataType: DATA_TYPE.String
            },
            created: {
                dataType: DATA_TYPE.DateTime
            },
            modified: {
                dataType: DATA_TYPE.DateTime
            },
            status: {
                dataType: DATA_TYPE.Number
            },
            polygonLatLong: {
                dataType: DATA_TYPE.String
            },
            polylineLatLong: {
                dataType: DATA_TYPE.String
            }
        }
    };

    const tblSitesData = {
        name: 'sites_data',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            siteid: {
                dataType: DATA_TYPE.Number
            },
            site_name: {
                dataType: DATA_TYPE.String
            },
            point: {
                dataType: DATA_TYPE.String
            },
            polygon: {
                dataType: DATA_TYPE.String
            },
            poly_line: {
                dataType: DATA_TYPE.String
            },
            polyCenter: {
                dataType: DATA_TYPE.String
            },
            cityId: {
                dataType: DATA_TYPE.Number
            },
            icon: {
                dataType: DATA_TYPE.String
            },
            siteTypeId: {
                dataType: DATA_TYPE.Number
            },
            zoneId: {
                dataType: DATA_TYPE.Number
            },

        }
    };
    const tblSiteTypes = {
        name: 'site_types',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },
            name: {
                dataType: DATA_TYPE.String
            },
            status: {
                dataType: DATA_TYPE.Number
            },
            icon: {
                dataType: DATA_TYPE.String
            }
        }
    };
    const tblSiteSubTypes = {
        name: 'site_sub_types',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },
            site_type_id: {
                dataType: DATA_TYPE.Number
            },
            name: {
                dataType: DATA_TYPE.String
            },
            status: {
                dataType: DATA_TYPE.Number
            }
        }
    };
    const tblSiteAttributes = {
        name: 'site_attributes',
        columns: {
            id: {
                dataType: DATA_TYPE.Number 
            },
            name: {
                dataType: DATA_TYPE.String
            },
            status: {
                dataType: DATA_TYPE.Number
            }
        }
    };
    const tblSiteAttributeData = {
        name: 'site_attribute_data',
        columns: {
            id: {
                dataType: DATA_TYPE.Number 
            },
            siteid: {
                dataType: DATA_TYPE.Number
            },
            site_attr: {
                dataType: DATA_TYPE.Number
            }
        }
    };
    const tblCity = {
        name: 'city',
        columns: {
            id: {
                dataType: DATA_TYPE.Number 
            },
            name: {
                dataType: DATA_TYPE.String
            }
        }
    };
    const tblSiteZones = {
        name: 'site_zones',
        columns: {
            id: {
                dataType: DATA_TYPE.Number 
            },
            name: {
                dataType: DATA_TYPE.String
            },
            status: {
                dataType: DATA_TYPE.Number 
            }
        }
    };
    const tblZones = {
        name: 'zones',
        columns: {
            id: {
                dataType: DATA_TYPE.Number 
            },
            zoneid: {
                dataType: DATA_TYPE.Number 
            },
            name: {
                dataType: DATA_TYPE.String
            },
            lat_long: {
                dataType: DATA_TYPE.String
            }
        }
    }
    const dataBase = {
        name: "pwa_vectorerp",
        tables: [
                    tblSites, 
                    tblSitesData, 
                    tblSiteTypes, 
                    tblSiteSubTypes,
                    tblSiteAttributes,
                    tblSiteAttributeData,
                    tblCity,
                    tblSiteZones,
                    tblZones
                ]
    };
    return dataBase;
};

export const initJsStore = async () => {
    const dataBase = getDatabase();
    return await connection.initDb(dataBase);
};

export const delDbJsStore = async () => {
    const dataBase = getDatabase();
    return await connection.dropDb(dataBase);
};

