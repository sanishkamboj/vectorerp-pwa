import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
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
            icon: {
                dataType: DATA_TYPE.String
            },
            site_attr_name: {
                dataType: DATA_TYPE.String
            },
            site_type_name: {
                dataType: DATA_TYPE.String
            },
            address: {
                dataType: DATA_TYPE.String  
            }

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
    };
    const tblTaskLandingRate = {
        name: 'task_landing_rate',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },
            siteid: {
                dataType: DATA_TYPE.Number 
            },
            srid: {
                dataType: DATA_TYPE.Number 
            },
            due_date: {
                dataType: DATA_TYPE.String
            },
            start_date: {
                dataType: DATA_TYPE.String
            },
            end_date: {
                dataType: DATA_TYPE.String
            },
            max_landing_rate: {
                dataType: DATA_TYPE.String
            },
            note: {
                dataType: DATA_TYPE.String
            },
            date_added: {
                dataType: DATA_TYPE.String
            },
            date_modfifed: {
                dataType: DATA_TYPE.String
            },
            species_id: {
                dataType: DATA_TYPE.String
            },
            userid: {
                dataType: DATA_TYPE.String
            }
        }
    };
    const TaskLandingRateSpecies = {
        name: 'task_landing_rate_species',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },
            task_landing_rate_id: {
                dataType: DATA_TYPE.Number
            },
            species_id: {
                dataType: DATA_TYPE.Number
            }
        }
    };
    const taskLarvalSurveillance = {
        name: 'task_larval_surveillance',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },
            siteid: {
                dataType: DATA_TYPE.Number
            },
            srid: {
                dataType: DATA_TYPE.Number
            },
            dips: {
                dataType: DATA_TYPE.Number
            },
            due_date: {
                dataType: DATA_TYPE.String
            },
            start_date: {
                dataType: DATA_TYPE.String
            },
            end_date: {
                dataType: DATA_TYPE.String
            },
            genus: {
                dataType: DATA_TYPE.String
            },
            count: {
                dataType: DATA_TYPE.Number
            },
            eggs: {
                dataType: DATA_TYPE.Boolean
            },
            bInstar1: {
                dataType: DATA_TYPE.Boolean
            },
            bInstar2: {
                dataType: DATA_TYPE.Boolean
            },
            bInstar3: {
                dataType: DATA_TYPE.Boolean
            },
            bInstar4: {
                dataType: DATA_TYPE.Boolean
            },
            Pupae: {
                dataType: DATA_TYPE.Boolean
            },
            Adult: {
                dataType: DATA_TYPE.Boolean
            },
            genus2: {
                dataType: DATA_TYPE.String
            },
            count2: {
                dataType: DATA_TYPE.Number
            },
            eggs2: {
                dataType: DATA_TYPE.Boolean
            },
            Instar12: {
                dataType: DATA_TYPE.Boolean
            },
            Instar22: {
                dataType: DATA_TYPE.Boolean
            },
            Instar32: {
                dataType: DATA_TYPE.Boolean
            },
            Instar42: {
                dataType: DATA_TYPE.Boolean
            },
            Pupae2: {
                dataType: DATA_TYPE.Boolean
            },
            Adult2: {
                dataType: DATA_TYPE.Boolean
            },
            AvgLarvel: {
                dataType: DATA_TYPE.String
            },
            note: {
                dataType: DATA_TYPE.String
            },
            date_added: {
                dataType: DATA_TYPE.String
            },
            date_modified: {
                dataType: DATA_TYPE.String
            }
        }
    };
    const taskTreatment = {
        name : 'task_treatment',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },
            siteid: {
                dataType: DATA_TYPE.Number
            },
            srid: {
                dataType: DATA_TYPE.Number
            },
            due_date: {
                dataType: DATA_TYPE.String
            },
            type: {
                dataType: DATA_TYPE.String
            },
            start_date: {
                dataType: DATA_TYPE.String
            },
            end_date: {
                dataType: DATA_TYPE.String
            },
            tpid: {
                dataType: DATA_TYPE.Number
            },
            area: {
                dataType: DATA_TYPE.String
            },
            area_treated: {
                dataType: DATA_TYPE.String
            },
            amount_applied: {
                dataType: DATA_TYPE.String
            },
            uid: {
                dataType: DATA_TYPE.Number
            },
            date_added: {
                dataType: DATA_TYPE.String
            },
            date_modified: {
                dataType: DATA_TYPE.String
            },
            userid: {
                dataType: DATA_TYPE.Number
            },
            justification: {
                dataType: DATA_TYPE.Boolean
            },
            comments: {
                dataType: DATA_TYPE.String
            }
        }
    };
    const tastTrap = {
        name: 'tast_trap',
        columns: {
            id: {
                dataType: DATA_TYPE.Number
            },

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

