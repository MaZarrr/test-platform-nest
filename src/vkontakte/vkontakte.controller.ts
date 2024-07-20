import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { VKontakteService } from './vkontakte.service';

@Controller()
export class VKontakteController {
  constructor(private readonly vkService: VKontakteService) {}

  @Post('test')
  public async test(): Promise<void> {
    return this.vkService.test();
  }

  @Post('sending')
  public async sendMessageVK(@Body() formDataOrderDto: any): Promise<void> {
    return this.vkService.sendMessageVK(formDataOrderDto);
  }

  @Post('vacancy')
  public async sendMessageVacancy(@Body() formDataOrderDto: any): Promise<void> {
    console.log('sendMessageVacancy', formDataOrderDto);
    return this.vkService.sendMessageVacancy(formDataOrderDto);
  }


  @Post('getGroupOrders')
  public async getGroupOrders(@Body() albumsData: any): Promise<void> {
    return this.vkService.getGroupOrders(albumsData);
  }

  @Post('getUserOrders')
  public async getUserOrders(@Body() albumsData: any): Promise<void> {
    return this.vkService.getUserOrders(albumsData);
  }

  @Post('getAllProducts')
  public async getAllProducts(@Body() proudctsData: any): Promise<void> {
    return this.vkService.getAllProducts(proudctsData);
  }

  @Post('getProducts')
  public async getProducts(@Body() proudctsData: any): Promise<any> {
    console.log("proudctsData", proudctsData);
    
    return this.vkService.getProducts(proudctsData);
  }

  @Post('getWall')
  public async getWall(@Body() wallData: any): Promise<void> {
    return this.vkService.getWall(wallData);
  }
// 
  @Post('/getProduct/:id')
  public async getProduct(@Param('id') id: any): Promise<void> {
    // console.log("id__", id);
    
    return this.vkService.getProduct(id);
  }

  @Post('getCategories')
  public async getCategories(@Body() categoriesData: any): Promise<void> {
    return this.vkService.getCategories(categoriesData);
  }

  @Post('getAlbums')
  public async getAlbums(@Body() albumsData: {count: number, isGroup: boolean}): Promise<{ok: boolean, data: any}> {
    return this.vkService.getAlbums({count: albumsData.count, isGroup: albumsData.isGroup});
  }

  @Post('generateYaml')
  public async generateYaml(@Body() albumsData: {count: number, isGroup: boolean}): Promise<{ok: boolean, data: any}> {
    return this.vkService.generateYaml({count: albumsData.count, isGroup: albumsData.isGroup});
  }

  @Get('auth')
  public async authToken(@Body() authData: any, @Res() res: any): Promise<void> {
    return this.vkService.auth(authData, res);
  }
}




// CREATE OR REPLACE FUNCTION get_contest_data(contest_id integer)
// RETURNS TABLE (
//     column1 datatype1,
//     column2 datatype2,
//     -- Add other columns with their data types
// )
// AS $$
// DECLARE
//     table_name text;
//     query text;
// BEGIN
//     -- Check which table contains the contest_id and store the table name
//     SELECT table_name
//     INTO table_name
//     FROM information_schema.tables
//     WHERE table_name LIKE 'vk_contests%'
//     AND EXISTS (
//         SELECT 1
//         FROM information_schema.columns
//         WHERE table_name LIKE 'vk_contests%'
//         AND column_name = 'contest_id'
//     )
//     AND EXISTS (
//         SELECT 1
//         FROM vk_contests
//         WHERE contest_id = contest_id
//     );

//     -- If no table found, raise an exception
//     IF table_name IS NULL THEN
//         RAISE EXCEPTION 'Table vk_contests containing the provided contest_id does not exist';
//     END IF;

//     -- Construct the dynamic query
//     query := format('SELECT * FROM %I WHERE contest_id = %s', table_name, contest_id);

//     -- Execute the query and return the result
//     RETURN QUERY EXECUTE query;
// END;
// $$ LANGUAGE plpgsql;























// The code you provided is a PostgreSQL function that retrieves data from a specific table in the database based on the provided contest_id. Here's a step-by-step breakdown of what the code does:

// Function Declaration:

// sql
// Copy code
// CREATE OR REPLACE FUNCTION get_contest_data(contest_id integer)
// RETURNS TABLE (
//     column1 datatype1,
//     column2 datatype2,
//     -- Add other columns with their data types
// )
// AS $$
// This part of the code defines a function named get_contest_data, which takes a single input parameter contest_id of type integer. The function returns a table, and the columns returned are specified in the RETURNS TABLE clause. The actual data types of the columns are represented by datatype1, datatype2, and so on.

// Local Variables:

// vbnet
// Copy code
// DECLARE
//     table_name text;
//     query text;
// BEGIN
// In the DECLARE section, two local variables are defined: table_name of type text and query of type text. These variables will be used to store the dynamically determined table name and the constructed SQL query, respectively.

// Determine the Table Name:

// sql
// Copy code
// SELECT table_name
// INTO table_name
// FROM information_schema.tables
// WHERE table_name LIKE 'vk_contests%'
// AND EXISTS (
//     SELECT 1
//     FROM information_schema.columns
//     WHERE table_name LIKE 'vk_contests%'
//     AND column_name = 'contest_id'
// )
// AND EXISTS (
//     SELECT 1
//     FROM vk_contests
//     WHERE contest_id = contest_id
// );
// This part of the code attempts to identify the table name that contains the contest_id column and where the provided contest_id exists. It searches in the information_schema.tables view for tables whose names start with 'vk_contests'. Then, it checks if there is a column named 'contest_id' in those tables and verifies that the provided contest_id exists in the vk_contests table. If a matching table is found, its name is stored in the table_name variable.

// Handle Table Not Found:

// vbnet
// Copy code
// IF table_name IS NULL THEN
//     RAISE EXCEPTION 'Table vk_contests containing the provided contest_id does not exist';
// END IF;
// If no table containing the provided contest_id is found, the function raises an exception with the message 'Table vk_contests containing the provided contest_id does not exist'. This is done to handle the case where there is no appropriate table to fetch data from.

// Construct the Dynamic Query:

// css
// Copy code
// query := format('SELECT * FROM %I WHERE contest_id = %s', table_name, contest_id);
// The function constructs a dynamic SQL query using the format function. The %I placeholder in the query represents an identifier (table name in this case), and %s represents a string value (the provided contest_id). The constructed query selects all columns (*) from the identified table where the contest_id matches the provided value.

// Execute the Query and Return the Result:

// graphql
// Copy code
// RETURN QUERY EXECUTE query;
// Finally, the function executes the dynamically constructed SQL query using the EXECUTE command. The RETURN QUERY statement returns the result of the query as the output of the function.

// Overall, this function uses dynamic SQL to identify the appropriate vk_contests table based on the provided contest_id and then fetches data from that table using the constructed query. It provides a flexible way to access the data even when there are multiple tables with similar names in the database.