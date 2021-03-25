import React from 'react';
import { shallow } from 'enzyme';
import MainContainer from '../../../containers/MainContainer/MainContainer';

jest.mock(
  'nr1',
  () => {
    const AccountsQuery = {
      query: jest.fn().mockReturnValue({
        data: [{ id: 123 }]
      })
    };
    const AccountStorageQuery = {
      query: jest
        .fn()
        .mockImplementation(({ accountId, collection, documentId }) => {
          switch (collection) {
            case 'pathpoint': {
              switch (documentId) {
                case 'version':
                  return { data: { Version: '9.9.9' } };
                case 'newViewJSON':
                  return { data: { ViewJSON: [{}, {}], BannerKpis: [{}, {}] } };
                case 'dataCanary':
                  return { data: { dataCanary: [{}, {}] } };
                case 'touchpoints':
                  return {
                    data: {
                      TouchPoints: [
                        {
                          index: 0,
                          country: 'PRODUCTION',
                          touchpoints: [
                            {
                              stage_index: 1,
                              value: 'Catalog API',
                              touchpoint_index: 1,
                              status_on_off: true,
                              relation_steps: [1],
                              measure_points: [
                                {
                                  type: 0,
                                  query: 'SIMPLE QUERY OF TYPE 0',
                                  error_threshold: 5
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  };
                case 'HistoricErrorsParams':
                  return {
                    data: {
                      historicErrorsDays: 0,
                      historicErrorsHighLightPercentage: 0
                    }
                  };
                case 'maxCapacity':
                  return {
                    data: {
                      Capacity: [
                        {
                          STAGES: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        }
                      ]
                    }
                  };
              }
              break;
            }
          }
          return accountId;
        })
    };
    const NerdGraphQuery = {
      query: jest.fn().mockImplementation(async ({ query }) => {
        if (query.includes('BAD REQUEST')) {
          const errors = [];
          await new Promise((resolve, reject) => {
            errors.push('Unexpected query');
            return reject(errors);
          });
        } else if (query.includes('KPI')) {
          let dataReturn = {};
          await new Promise(resolve => {
            dataReturn = {
              data: {
                actor: {
                  measure_0: {
                    nrql: {
                      results: [{ value: 27 }]
                    }
                  },
                  measure_1: {
                    nrql: {
                      results: [{ value: 1 }]
                    }
                  }
                }
              }
            };
            return resolve();
          });
          return dataReturn;
        } else if (query.includes('measure')) {
          let dataReturn = {};
          await new Promise(resolve => {
            dataReturn = {
              data: {
                actor: {
                  measure_0: {
                    nrql: {
                      results: [{ count: 27 }]
                    }
                  },
                  measure_1: {
                    nrql: {
                      results: [{ percentage: 27 }]
                    }
                  },
                  measure_2: {
                    nrql: {
                      results: [{ score: 27 }]
                    }
                  },
                  measure_3: {
                    nrql: {
                      results: [{ session: 27 }]
                    }
                  },
                  measure_4: {
                    nrql: {
                      results: [
                        {
                          facet: 'abc123',
                          count: 1,
                          session: 'abc123'
                        },
                        {
                          facet: 'cde345',
                          count: 1,
                          session: 'cde345'
                        },
                        {
                          facet: 'fgh678',
                          count: 1,
                          session: 'fgh678'
                        }
                      ]
                    }
                  },
                  measure_5: {
                    nrql: {
                      results: [
                        {
                          R1: 1,
                          R2: 2
                        }
                      ]
                    }
                  }
                }
              }
            };
            return resolve();
          });
          return dataReturn;
        } else if (query.includes('PathpointHistoricErrors')) {
          let dataReturn = {};
          await new Promise(resolve => {
            dataReturn = {
              data: {
                actor: {
                  account: {
                    nrql: {
                      results: [
                        { count: 2, facet: [1, 1, 4] },
                        { count: 0.3, facet: [1, 1, 4] }
                      ]
                    }
                  }
                }
              }
            };
            return resolve();
          });
          return dataReturn;
        }
      })
    };

    const AccountStorageMutation = {
      ACTION_TYPE: { WRITE_DOCUMENT: 'WRITE_DATA' },
      mutate: jest.fn().mockImplementation(() => {
        return { data: {} };
      })
    };
    const nerdlet = {
      setConfig: jest.fn()
    };
    const logger = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    };
    return {
      AccountsQuery: AccountsQuery,
      AccountStorageQuery: AccountStorageQuery,
      AccountStorageMutation: AccountStorageMutation,
      NerdGraphQuery: NerdGraphQuery,
      nerdlet: nerdlet,
      logger
    };
  },
  { virtual: true }
);

const stages = [
  {
    index: 1,
    title: 'BROWSE',
    latencyStatus: false,
    status_color: 'good',
    gout_enable: false,
    gout_quantity: 150,
    money_enabled: false,
    trafficIconType: 'traffic',
    money: '',
    icon_active: false,
    icon_description: 'medal',
    icon_visible: false,
    congestion: {
      value: 0,
      percentage: 15
    },
    capacity: 0,
    total_count: 0,
    active_dotted: 'none',
    active_dotted_color: '#828282',
    steps: [
      {
        value: '',
        sub_steps: [
          {
            index: 1,
            id: 'ST1-LINE1-SS1',
            canary_state: false,
            latency: true,
            value: 'Web',
            dark: false,
            history_error: false,
            dotted: false,
            highlighted: false,
            error: false,
            index_stage: 1,
            relationship_touchpoints: [1]
          }
        ]
      }
    ],
    touchpoints: [
      {
        index: 1,
        stage_index: 1,
        status_on_off: true,
        active: false,
        value: 'Catalog API',
        highlighted: false,
        error: false,
        history_error: false,
        countrys: [0],
        dashboard_url: [
          'https://one.newrelic.com/redirect/entity/Mjg0NzMzMnxWSVp8REFTSEJPQVJEfDE2NzQ3NDg'
        ],
        relation_steps: [1]
      }
    ]
  }
];

const canaryData = [
  {
    stage_index: 1,
    stage_title: 'Browse',
    states: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  }
];

describe('<MainContainer/>', () => {
  it('componentDidMount', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.BoootstrapApplication = jest.fn();
    instance.componentDidMount();
  });

  it('componentDidUpdate with all false', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    const prevState = {
      updating: false,
      pending: false,
      loading: false
    };
    instance.componentDidUpdate(null, prevState);
  });

  it('componentDidUpdate with updating', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    const prevState = {
      updating: true,
      pending: false,
      loading: false
    };
    instance.componentDidUpdate(null, prevState);
  });

  it('componentDidUpdate with updating, pending', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    const prevState = {
      updating: true,
      pending: true,
      loading: false
    };
    instance.componentDidUpdate(null, prevState);
  });

  it('componentDidUpdate with updating, pending, loading', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    const prevState = {
      updating: true,
      pending: false,
      loading: true
    };
    instance.ExecuteUpdateData = jest.fn();
    instance.componentDidUpdate(null, prevState);
  });

  it('componentWillUnmount', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.componentWillUnmount();
  });

  it('BoootstrapApplication', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.BoootstrapApplication();
  });

  it('ExecuteUpdateData', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.ExecuteUpdateData();
  });

  it('updateDataNow', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.updateDataNow();
  });

  it('ToggleHeaderButtons', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.ToggleCanaryIcon = jest.fn();
    instance.ToggleFireIcon = jest.fn();
    instance.ToggleHeaderButtons('iconCanaryStatus');
  });

  it('onClickStage', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.onClickStage(1);
  });

  it('InitLogoSetupData', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.LogoSetupData = {
      GetLogoSetupData: jest.fn()
    };
    instance.InitLogoSetupData();
  });

  // it('onclickStep', () => {
  //   const mainContainer = shallow(<MainContainer />);
  //   const instance = mainContainer.instance();
  //   instance.state.stages = stages;
  //   const stepEntry = {
  //     canary_state: false,
  //     dark: false,
  //     dotted: false,
  //     error: false,
  //     highlighted: true,
  //     history_error: false,
  //     id: 'ST1-LINE1-SS1',
  //     index: 1,
  //     index_stage: 0,
  //     latency: false,
  //     relationship_touchpoints: [1],
  //     value: 'Web'
  //   };
  //   instance.ResetAllStages = jest.fn();
  //   instance.onclickStep(stepEntry);
  // });

  it('ResetAllStages', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.ResetAllStages();
  });

  it('_onClose', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.restoreTouchPoints = jest.fn();
    instance._onClose();
  });

  it('PreSelectCanaryData', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.ExecuteSetCanaryData = jest.fn();
    instance.PreSelectCanaryData(canaryData);
  });

  // it('ExecuteSetCanaryData', () => {
  //   const mainContainer = shallow(<MainContainer />);
  //   const instance = mainContainer.instance();
  //   instance.DataManager = {
  //     SetCanaryData: jest.fn()
  //   };
  //   instance.ExecuteSetCanaryData();
  // });

  it('clearStepsSixthSense', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.clearStepsSixthSense();
  });

  it('ToggleCanaryIcon', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.ToggleCanaryIcon(true);
  });

  it('clearStepsHistoricError', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.clearStepsHistoricError(true);
  });

  // it('setStepsHistoricError', () => {
  //   const mainContainer = shallow(<MainContainer />);
  //   const instance = mainContainer.instance();
  //   instance.state.stages = stages;
  //   instance.setStepsHistoricError(1, 'ST1-LINE1-SS1');
  // });

  it('updateHistoricErrors', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.clearStepsHistoricError = jest.fn();
    instance.updateHistoricErrors();
  });

  it('ToggleFireIcon', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._onClose = jest.fn();
    instance.updateHistoricErrors = jest.fn();
    instance.DataManager = {
      ReadHistoricErrors: jest.fn()
    };
    instance.ToggleFireIcon(false);
  });

  it('removeDuplicates', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.removeDuplicates([]);
  });

  it('openModal', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance._onClose = jest.fn();
    instance.openModal(1);
  });

  it('updateTouchpointStageOnOff', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.updateTouchpointStageOnOff(stages[0].touchpoints[0]);
  });

  it('updateTouchpointOnOff', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.updateTouchpointStageOnOff = jest.fn();
    instance.DataManager = {
      UpdateTouchpointOnOff: jest.fn()
    };
    instance.state.stages = stages;
    instance.updateTouchpointOnOff(stages[0].touchpoints[0]);
  });

  it('openModalParent', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance._onClose = jest.fn();
    instance.DataManager = {
      GetTouchpointTune: jest.fn(),
      GetTouchpointQuerys: jest.fn()
    };
    instance.state.stages = stages;
    instance.openModalParent(stages[0].touchpoints[0], 1);
  });

  it('changeTimeRange', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.changeTimeRange({
      target: {
        value: '5 MINUTES AGO'
      }
    });
  });

  it('resetIcons with statusStar', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.resetIcons(true, false, false, false);
  });

  it('resetIcons with statusFire', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.resetIcons(false, true, false, false);
  });

  it('resetIcons with statusGot', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.resetIcons(false, false, true, false);
  });

  it('resetIcons with statusCanary', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.resetIcons(false, false, false, true);
  });

  it('renderContentAboveStep with statusStar', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.renderContentAboveStep(true, false, false, {
      icon_active: true
    });
  });

  it('renderContentAboveStep with statusGot', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.renderContentAboveStep(false, true, false, {
      icon_active: true
    });
  });

  it('renderContentAboveStep with statusFire', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.renderContentAboveStep(false, false, true, {
      icon_active: true
    });
  });

  it('changeTouchpointsView', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.changeTouchpointsView({
      target: {
        checked: true
      }
    });
  });

  it('_onCloseBackdropTouch', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.restoreTouchPoints = jest.fn();
    instance._onCloseBackdropTouch();
  });

  it('renderProps', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.restoreTouchPoints = jest.fn();
    instance.renderProps(1, {
      active: false
    });
  });

  it('restoreTouchPoints', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.restoreTouchPoints();
  });

  it('changeMessage', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stageNameSelected = {
      selectedCase: 'wrapper'
    };
    instance.state.stages = stages;
    instance.changeMessage({
      target: {
        value: 'wrapper'
      }
    });
  });

  it('chargueSample', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.state.stageNameSelected = {
      datos: [
        {
          wrapper: {
            label: 'test label'
          }
        }
      ]
    };
    instance.chargueSample(0);
  });

  it('testQuery', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.state.stageNameSelected = {
      datos: [
        {
          wrapper: {
            label: 'test label'
          }
        }
      ]
    };
    instance.testQuery('SELECT * FROM', 0);
  });

  it('handleChangeTexarea', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.state.stageNameSelected = {
      datos: [
        {
          wrapper: {
            label: 'test label'
          }
        }
      ]
    };
    instance.handleChangeTexarea('SELECT * FROM');
  });

  it('handleChangeTexareaSupport', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.handleChangeTexareaSupport({
      target: {
        value: 'This is test message'
      }
    });
  });

  it('handleChangeSubject', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.handleChangeSubject({
      value: {
        label: 'This is test label'
      }
    });
  });

  it('handleSaveUpdateQuery', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.DataManager = {
      UpdateTouchpointQuerys: jest.fn()
    };
    instance.handleSaveUpdateQuery({
      preventDefault: jest.fn(),
      target: {
        value: 'SELECT * FROM'
      }
    });
  });

  it('handleSaveUpdateTune', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._onClose = jest.fn();
    instance.DataManager = {
      UpdateTouchpointTune: jest.fn()
    };
    instance.handleSaveUpdateTune({
      threshold: 1,
      apdex: 1
    });
  });

  it('handleSaveUpdateCanary', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._onClose = jest.fn();
    instance.handleSaveUpdateCanary({
      preventDefault: jest.fn(),
      target: {
        elements: {
          checkbox_canary: true
        }
      }
    });
  });

  it('handleSaveUpdateFire', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._onClose = jest.fn();
    instance.handleSaveUpdateFire({
      preventDefault: jest.fn(),
      target: {
        elements: {
          checkbox_fire: {
            checked: true
          }
        }
      }
    });
  });

  it('LogoFormSubmit', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._onClose = jest.fn();
    instance.LogoSetupData = {
      SetLogoSetupData: jest.fn()
    };
    instance.LogoFormSubmit({ type: 'default' }, jest.fn());
  });

  it('handleSaveUpdateSupport', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._resetFormSupport = jest.fn();
    instance._onClose = jest.fn();
    instance.handleSaveUpdateSupport({
      subject: 'Subject',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      account: 'Account',
      company: 'Company'
    });
  });

  it('_resetFormSupport', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._resetFormSupport();
  });

  it('openLeftMenu', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.openLeftMenu();
  });

  it('_onCloseBackdrop', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._onCloseBackdrop();
  });

  it('_handleClickSetup', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._handleClickSetup();
  });

  it('_handleClickProcesses', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._handleClickProcesses();
  });

  it('_handleClickSupport', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._handleClickSupport();
  });

  it('HandleChangeLogo', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.HandleChangeLogo();
  });

  it('_handleContextMenuGout', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._handleContextMenuGout({
      button: 2
    });
  });

  it('_handleContextMenuStar', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._handleContextMenuStar({
      button: 2
    });
  });

  it('_handleContextMenuFire', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._handleContextMenuFire({
      button: 2
    });
  });

  it('_onCloseMenuRight', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.DataManager = {
      UpdateHistoricParameters: jest.fn()
    };
    instance._onCloseMenuRight();
  });

  it('_onCloseMenuRight with MenuRightDefault = 3', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.MenuRightDefault = 3;
    instance.state.stages = stages;
    instance.DataManager = {
      UpdateHistoricParameters: jest.fn()
    };
    instance._onCloseMenuRight();
  });

  it('_DropHandleChange', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._DropHandleChange({
      target: {
        value: true
      }
    });
  });

  it('_StarHandleChange', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._StarHandleChange({
      target: {
        value: true
      }
    });
  });

  it('_FlameHandleChange', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance._FlameHandleChange({
      target: {
        value: true
      }
    });
  });

  it('GetCurrentConfigurationJSON', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.DataManager = {
      GetCurrentConfigurationJSON: jest.fn()
    };
    instance.GetCurrentConfigurationJSON();
  });

  // it('SetConfigurationJSON', () => {
  //   const mainContainer = shallow(<MainContainer />);
  //   const instance = mainContainer.instance();
  //   instance.state.stages = stages;
  //   instance.DataManager = {
  //     SetConfigurationJSON: jest.fn()
  //   };
  //   const banner_kpis = [
  //     {
  //       type: 100,
  //       description: 'Total Order Count',
  //       prefix: '',
  //       suffix: 'Orders',
  //       query: 'SELECT count(*) as value FROM Transaction SINCE 1 minute AGO',
  //       value: 0
  //     }
  //   ];
  //   instance.SetConfigurationJSON({
  //     stages,
  //     banner_kpis
  //   });
  // });

  it('GetCurrentHistoricErrorScript', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.state.stages = stages;
    instance.DataManager = {
      GetCurrentHistoricErrorScript: jest.fn()
    };
    instance.GetCurrentHistoricErrorScript();
  });

  it('DisplayConsole with error', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.DisplayConsole('error', 'Error Message');
  });

  it('DisplayConsole with log', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.DisplayConsole('log', 'Log Message');
  });

  it('DisplayConsole with warning', () => {
    const mainContainer = shallow(<MainContainer />);
    const instance = mainContainer.instance();
    instance.DisplayConsole('warning', 'Warning Message');
  });
});
