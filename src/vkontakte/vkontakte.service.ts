import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import VkBot from "node-vk-bot-api";
import { transformEmailData } from "src/teamplates/orderTeamplate";
import { transformSocialData } from "src/teamplates/orderTeamplateSendVK";

// speific params
type ExecuteAuthParams = {
  params: {
    count?: number
    isGroup?: boolean
    album_id?: string
    album_ids?: string
    item_ids?: string
    offset?: number
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
    public group_Id: number;
    
    constructor(private readonly mailerService: MailerService) {
      this.group_Id = Number(process.env.GROUP_ID)
      this.botUser = new VkBot({
        token: process.env.API_USERS,
        group_id: this.group_Id,
      });

    }

      
    public async sendMessageVK(formDataOrderDto: any): Promise<void> {
      const socialData = transformSocialData(formDataOrderDto);
      this.botUser.sendMessage([
        Number(process.env.USER_ONE),
        // Number(process.env.USER_TWO),
        // Number(process.env.USER_THREE),
      ] as any, socialData);
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

        } catch (error) {
          console.log("ERROR", error);
          
        }
    }

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

    public async getProducts(props: any): Promise<any> {
      try {
        console.log("props___", props);
        
        const albums = await this.botExecute('market.getAlbumById', {
          params: {
            album_ids: props.albumId,
            isGroup: false
          }
        });
        
        const products = await this.botExecute('market.get', {
            params: {
              count: albums.data.items[0].count,
              isGroup: false,
              album_id: String(props.albumId)
            }
      });

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

    public async getProduct({ productId } : { productId: string }): Promise<any> {
    try {
        console.log("getProduct__productId", productId);
        
        const product = await this.botExecute('market.getById', {
          params: {
            isGroup: false,
            item_ids: String(productId)
          }
        });
        console.log("getProduct__product", product);

        return {
          ok: true,
          data: product
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
        const albumsAll = await this.getAlbums({ count: albums.data.data.count, isGroup: false });
        const albumItems = albumsAll.data.data.items;
        
        let allData: any = [];

        for(let item of albumItems) {
            const product = this.botExecute('market.get', {
                params: {
                  count: item.count,
                  isGroup: false,
                  album_id: String(item.id)
                }
          });
          allData.push(product)
        };

        const products = await Promise.all(allData);
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

    public async sendOrder(formDataOrderDto: any): Promise<void> {
      const emailData = transformEmailData(formDataOrderDto);
      this.mailerService
        .sendMail(emailData)
        .then(() => {})
        .catch((error) => console.log(error)
        );
    }


    // =================================
    public async botExecute(method: string, { params }: ExecuteAuthParams) {
      try {
        const { isGroup } = params;
        const spechificParams = {}
        const groupId = isGroup ? this.group_Id : -this.group_Id;
        const ownerOrUser = isGroup ? 'group_id' : 'owner_id';
        // console.log("ownerOrUser", ownerOrUser);
        
        const options = {
          [ownerOrUser]: groupId,
          ...params
        }
        console.log("options___", options);
        
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
  

}