import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import VkBot from "node-vk-bot-api";
import { transformSocialData } from "src/teamplates/orderTeamplateSendVK";
import * as builder from 'xml2js';

// speific params
type ExecuteAuthParams = {
  params: {
    count?: number
    isGroup?: boolean
    album_id?: string
    album_ids?: string
    item_ids?: string
    offset?: number
    extended?: number
  }
}
      // public botGroup: VkBot;
      // 189390383
      // this.botGroup = new VkBot({
      //   token: process.env.API_GROUPS,
      //   group_id: this.group_Id,
      // });


@Injectable()
export class VKontakteService {
    public botUser: VkBot;
    public botSendMessage: VkBot;
    public group_Id: number;
    
    constructor() {
      this.group_Id = Number(process.env.GROUP_ID)
      this.botUser = new VkBot({
        token: process.env.API_USERS,
        group_id: this.group_Id,
      });
      this.botSendMessage = new VkBot({
        token: process.env.SOCIAL_API,
        group_id: this.group_Id,
      });



    }
  
    public async auth(auth: any, res: any) {
        try {
          // console.log('resssss', res);
          // res.redirect(`https://oauth.vk.com/authorize?client_id=${51438861}&display=page&redirect_uri=https://svisni-sushi.ru&scope=friends,market&response_type=code&v=5.194`)
          
          // res.redirect(`https://oauth.vk.com/authorize?client_id=51438861&display=page&redirect_uri=https://svisni-sushi.ru&group_ids=161250465&scope=messages,market,offline&response_type=code&v=5.194`)
          // res.redirect(`https://oauth.vk.com/access_token?client_id=51438861&client_secret=TWYHVIE7Ai2T7G2w4q9L&redirect_uri=https://svisni-sushi.ru&code=fbd4ca8ade46337be9`)
          
          // res.redirect(`https://oauth.vk.com/authorize?client_id=51438861&display=page&redirect_uri=https://svisni-sushi.ru&scope=friends,market,offline,groups,wall,friends&response_type=code&v=5.131`)
          // res.redirect(`https://oauth.vk.com/access_token?client_id=51438861&client_secret=TWYHVIE7Ai2T7G2w4q9L&redirect_uri=https://svisni-sushi.ru&code=5867d6b0b21269af60`)
          
          

          // {"expires_in":0,"groups":[{"group_id":161250465,"access_token":"vk1.a.Xzm0Id69TrVr7QXPwbD5Ep0gfXbpUpKg_FvLO1DlO11TNZiZorvw62UMtWGlQsYXeWu7TLvq6a5yGkU85qsEhPyccMypqBLlJkKUWuRok9-vDYb6jwZs_29Mii-PLFk6Yk9qmFCtviyIapA8HEgpMBkctVC0NLaayrl0gWqGRS6WYesORMJnHw8LP8SYTyWc"}],"access_token_161250465":"vk1.a.Xzm0Id69TrVr7QXPwbD5Ep0gfXbpUpKg_FvLO1DlO11TNZiZorvw62UMtWGlQsYXeWu7TLvq6a5yGkU85qsEhPyccMypqBLlJkKUWuRok9-vDYb6jwZs_29Mii-PLFk6Yk9qmFCtviyIapA8HEgpMBkctVC0NLaayrl0gWqGRS6WYesORMJnHw8LP8SYTyWc"}
          
          // res.redirect(`https://oauth.vk.com/access_token?client_id=51438861&client_secret=TWYHVIE7Ai2T7G2w4q9L&redirect_uri=https://svisni-sushi.ru&code=93edac958a4c5fd445`)
          // {"access_token":"vk1.a.R84OxlSbvtFquVmY6be6da5Tqa25F87uHEwvZY0MQNQ3c8PXKoXuptWdE2vXLZ1SiIQy38cJzJtQAhfGRIGnGhjy6wOsimNuTeX9E-KYL4sTbx_9w47XFWxangHTo7WWXnpr54QF3cadTM-m1y1cr7ryZt_Qq7zA-YzD-Bf_SfDMObXApEtYzYp9e1vayj-K","expires_in":86372,"user_id":539634162}
          // {"access_token":"vk1.a.TaUPBbnVX9XqR_wLojBvfQ9vLUb05UOqEhGymINF90StrZPBrrRAHi59g9NXe4E4HuJKpPmbJQxNJyCoRm459OgQgVL-LKXq4PZUPFhUI-nPRX3z1AzDPDe81axDqhZfaJE9Ey0oX9VhyuVgQrY9e2OPUb_F9eC5iR4TDkjFt1LYawdE7hUj8VJaHR7kZBlA",
          // "expires_in":86176,
          // "user_id":159203191}
          // https://oauth.vk.com/access_token?client_id=51438861&client_secret=TWYHVIE7Ai2T7G2w4q9L&redirect_uri=http://mysite.ru&code=90c1daf58d82eddc34

          // let response = await this.bot.execute('groups.get', {
          //   scope: 'groups',
          //   filter: 'admin'
          // });
          // console.log(".group_ids", response);
          // response.redirect(`https://oauth.vk.com/authorize?client_id=51438861&display=page&redirect_uri=https://svisni-sushi.ru&group_ids=161250465&scope=messages&response_type=code&v=5.194`)


          // ===============================
          // 25.04.2023
          // регистрация через вконтакте
          // https://oauth.vk.com/authorize?client_id=51626351&redirect_uri=http://127.0.0.1:3001/register&display=page&group_ids=&response_type=code&scope=groups&v=5.194
          // https://oauth.vk.com/authorize?client_id=51626351&redirect_uri=http://localhost:4321/payments&group_ids=&scope=groups&v=5.199
        } catch (error) {
          console.log("ERROR", error);
          
        }
    }


    // public async ge

    public async getGroupOrders(groupData: any): Promise<any> {
        try {
            const albums = await this.botExecute('market.getGroupOrders', {
              params: {
                count: 1,
                isGroup: true
              }
            })
            
            return {
                ok: true,
                albums
            }
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                group_id: process.env.GROUP_ID,
                error
            }            
        }
    };

    public async getUserOrders(ordersData): Promise<any> {
      try {
          const orders = await this.botExecute('market.getOrders', {
            params: {
              count: 1,
              isGroup: true
            }
          })

          return {
              ok: true,
              orders
          }
      } catch (error) {
          return {
              ok: false,
              error
          }            
      }
    };

    public async getAlbums(albumsData: {count: number, isGroup: any}): Promise<{ok: boolean, data: any}> {
      try {
        const { count, isGroup } = albumsData
        
        console.log("getAlbums___", count, isGroup);
        
        const albums = await this.botExecute('market.getAlbums', {
          params: {
            count: 1,
            isGroup: false
          }
        });
        const albumsLength = albums.data.count;
        const albumsAll = await this.botExecute('market.getAlbums', {
          params: {
            count: albumsLength,
            isGroup: false
          }
        });
        console.log("albumsLength_2_", albumsLength);
        
        const albumsVisible = albumsAll.data.items.filter((item) => !item.is_hidden)

        return {
          ok: true,
          data: albumsVisible
        }
      } catch (error) {
          return {
            ok: false,
            data: error
          }
      }
    };


    public async generateYaml(albumsData: {count: number, isGroup: any}): Promise<{ok: boolean, data: any}> {
      try {
        const albums = await this.botExecute('market.getAlbums', {
          params: {
            count: 1,
            isGroup: false
          }
        });
        const albumsLength = albums.data.count;
        
        const albumsAll = await this.botExecute('market.getAlbums', {
          params: {
            count: albumsLength,
            isGroup: false
          }
        });

        let offer: Array<any> = [];
        for (let item of albumsAll.data.items) {
          // if(item.id == 6 || item.id == 4) {

          const productsAlbum = await this.botExecute('market.get', {
            params: {
              // count: 1,
              // album_id: 6,
              count: item.count,
              album_id: item.id,
              isGroup: false,
              need_variants: 1,
              extended: 1,
              v: 5.199
            }
          });
          
        productsAlbum.data.variants.forEach((variant, idx) => {
          const variantData = {
              $: { id: variant.id, available: 'true', ...(variant?.variants_grouping_id && { group_id: variant.variants_grouping_id }) },
              price: parseInt(variant.price.text.replace(/\s/g, '')),
              currencyId: variant.price.currency.name,
              categoryId: variant.albums_ids,
              name: variant.title,
              description: variant.description,
              ...( variant?.property_values && { param: variant.property_values.map((item: any) => {
                  return {
                    $: { name: item.property_name }, _: item.variant_name
                  }
              }) }),
              picture: variant.photos.map((photo) => {
                const findSizes = photo.sizes.find((item) => item.type === 'z' || item.type === 'w' || item.type === 'r');
                if(findSizes) {
                  return findSizes.url;
                }
              }).filter((item) => item !== undefined), // исправить &amp;
            }
            offer.push(variantData)
          })
        // }  
        }
          
        const albumsVisible = albumsAll.data.items.filter((item) => !item.is_hidden)
        const catalogData = {
          yml_catalog: {
            $: { date: this.getFormattedDate() },
            shop: {
              name: 'vk.com',
              company: 'vk.com',
              url: 'https://vk.com/',
              currencies: {
                currency: {
                  $: { id: 'RUB', rate: '1' },
                },
              },
              categories: {
                category: albumsAll.data.items.map((item: any) => {
                  return {
                    $: { id: String(item.id) }, _: item.title
                  }
                })
              },
              offers: {
                offer: offer
              },
            },
          },
        };

        const xmlBuilder = new builder.Builder({ 
          renderOpts: { 
            pretty: true, 
            indent: '  ',
          },
          xmldec: { 
            version: '1.0', 
            encoding: 'UTF-8', 
            standalone: null,
          },
        });
        const xmlString = xmlBuilder.buildObject(catalogData);
        // const xmlString = xmlBuilder.create(catalogData, { encoding: 'UTF-8' }).end({ pretty: true });
        // const modifiedXmlString = xmlString.replace(/&amp;/g, '&');
        const fs = require('fs');
        fs.writeFileSync('output.xml', xmlString);

        return {
          ok: true,
          data: albumsVisible
        }
      } catch (error) {
          return {
            ok: false,
            data: error
          }
      }
    };



    public async getProducts(props: any): Promise<any> {
      try {
        // const dataSlug = [{ slug: 'pizza', id: props.id }]
        // const findDD = dataSlug.find((item) => item.slug == props.albumId)

        console.log("props___", props);
        const albums = await this.botExecute('market.getAlbumById', {
          params: {
            album_ids: props.data.albumId,
            isGroup: false 
          }
        });
        // console.log("albums__", albums);
        
        const data = albums.data.items[0];
        // console.log("dara", data);
        // console.log("datadata", data);
        
        // const findProductID = data.find((item) => item.id == props.albumId )
        // const data = [{ title: props.name, id: props.id, categoryName: props.albumId }];
        // console.log("findDD", findDD);
        const products = await this.botExecute('market.get', {
            params: {
              count: albums.data.items[0].count,
              isGroup: false,
              album_id: String(props.data.albumId,)
            }
      });
      // // console.log("products__", products.data.items.map((item) => console.log(item)));
      // console.log("products__2", products.data.items[4]);
        return {
          ok: true,
          data: products
        }
      } catch (error) {
          return {
              ok: false,
              error
          }
      }
    };

    public async getProduct(id): Promise<any> {
    try {
        const product = await this.botExecute('market.getById', {
          params: {
            isGroup: false,
            item_ids: -'161250465'+ '_' + String(id),
            extended: 1
          }
        });

        if(product.ok) {
          // console.log("getProduct__product", product.data.items);
          return {
            ok: true,
            data: product.data.items
          }
        } else {
          return {
            ok: true,
            data: 'Продукт не найдет'
          }
        }

    } catch (error) {
        return {
          ok: false,
          error
        }
      }
    };
    
    public async getAllProducts({ data }: any): Promise<any> {
      try {
        const albums = await this.getAlbums({ count: 1, isGroup: false });
        const albumsAll = await this.getAlbums({ count: albums.data.length, isGroup: false });
        const albumItems = albumsAll.data;  
        let allData: any = [];
        console.log("albumItems_albumItems", albumItems);
        
        for(let item of albumItems) {
          const product = await this.botExecute('market.get', {
              params: {
                count: item.count,
                isGroup: false,
                album_id: String(item.id)
              }
        });
        // console.log("item__product", product);
        const result = product.data;
        allData.push({
          ok: product.ok,
          count: result.count, 
          items: result.items, 
          albumId: item.id, 
          slugname: item.title 
        })
        // allData.push({...product, data: { ...product.data, albumId: item.id, slugTitle: item.title }})
      };
      
      console.log("item__allData", allData);

      // albumItems - item 
      // item__item {
      //   id: 2,
      //   owner_id: -161250465,
      //   title: 'СЕТЫ РОЛЛОВ�',
      //   count: 30,
      //   updated_time: 1612796808,
      //   is_main: false,
      //   is_hidden: false,
      //   photo: {
      //     album_id: -53,
      //     date: 1616861390,
      //     id: 457250705,
      //     owner_id: -161250465,
      //     sizes: [ [Object], [Object], [Object], [Object] ],
      //     text: '',
      //     user_id: 100
      //   }
      // }
      return {
        ok: true,
        data: allData
      }
      } catch (error) {
          return {
              ok: false,
              error
          }
      }
    }

    // Возвращает список категорий для товаров. // ??
    public async getCategories(categoriesData: any): Promise<any> {
        try {
            const categories = await this.botExecute('market.getCategories', {
                params: {
                  count: 3
                }
            })
            return {
              ok: false,
              categories
            }
        } catch (error) {
            return {
              ok: false,
              error
            }
        }
    }

    public async getWall({ count }: any): Promise<any> {
        try {
            const newsFeed = await this.botExecute('wall.get', {
              params: {
                isGroup: false,
                count,
                // offset: 0
              }
            });

            console.log("newsFeed__", newsFeed);
            return {
              ok: true,
              data: newsFeed
            }
        } catch (error) {
            return {
              ok: false,
              error
            }
        }
    }
  
    public async sendMessageVK(formDataOrderDto: any): Promise<void> {
      const socialData = transformSocialData(formDataOrderDto);
      try {
        // let botUser = new VkBot({
        //   token: process.env.SOCIAL_API,
        //   group_id: Number(process.env.GROUP_ID),
        // });
        const orderPoint = formDataOrderDto.orderPoint;
        const userOrderId = orderPoint === 'Валуйки' ? Number(process.env.USER_FOUR) : Number(process.env.USER_THREE);
        await this.botSendMessage.sendMessage([
          Number(process.env.USER_ONE),
          Number(process.env.USER_TWO),
          userOrderId
        ] as any, socialData);  
      } catch (error) {
        console.log("err_sendmessageorder", error);
      }
    }

    public async sendMessageVacancy(formDataOrderDto: any): Promise<void> {
      try {
        const message = `
          РАБОТА. НОВЫЙ ОТКЛИК НА ВАКАНСИЮ.
          ${formDataOrderDto.date}
          ___
          Имя: ${formDataOrderDto.name}
          ${formDataOrderDto.phone}
          ${formDataOrderDto.vacancy}
          ${formDataOrderDto.opyt}
          ${formDataOrderDto.adress}
          ${formDataOrderDto.med}
          ${formDataOrderDto.week}
          ===
        `;
        await this.botSendMessage.sendMessage([
          Number(process.env.USER_ONE),
          Number(process.env.USER_TWO),
        ] as any, message);   
      } catch (error) {
        console.log("err_vacancy", error);
      }
    }

    // =================================
    public async botExecute(method: string, { params }: any) {
      // public async botExecute(method: string, { params }: ExecuteAuthParams) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 250));
        const { isGroup } = params;
        const spechificParams = {}
        const groupId = isGroup ? this.group_Id : -this.group_Id;
        const ownerOrUser = isGroup ? 'group_id' : 'owner_id';
        // console.log("ownerOrUser", ownerOrUser);
        
        const options = {
          [ownerOrUser]: groupId,
          ...params
        }
        // console.log("options___", options);
        
        // let botUser = new VkBot({
        //   token: process.env.API_USERS,
        //   group_id: Number(process.env.GROUP_ID),
        // });

        const response = await this.botUser.execute(method, options)

        return {
          ok: true,
          data: response
        }
      } catch (error) {
        return {
          ok: false,
          error
        }
      }
    }

    async test(): Promise<any>{
      try {
        const response = await this.botUser.execute('market.getOrders', {
          group_id: -this.group_Id,
          count: 1,
          // offset: 1
        });
        console.log("response___", response)

        return {
          ok: true,
          userOrders: response
        }
      } catch (error) {
        console.log("error", error);
        
      }
    }

    getFormattedDate(): string {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
      return formattedDate;
    }

}