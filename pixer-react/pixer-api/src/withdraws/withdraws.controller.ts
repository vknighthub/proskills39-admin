import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UsePipes,
} from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { ApproveWithdrawDto } from './dto/approve-withdraw.dto';
import { GetWithdrawsDto, WithdrawPaginator } from './dto/get-withdraw.dto';
import { WithdrawValidationPipe } from './pipe/withdraw-validation.pipe';

@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @Post()
  createWithdraw(@Body() createWithdrawDto: CreateWithdrawDto) {
    return this.withdrawsService.create(createWithdrawDto);
  }

  @Get()
  @UsePipes(new WithdrawValidationPipe())
  async withdraws(@Query() query: GetWithdrawsDto): Promise<WithdrawPaginator> {
    return this.withdrawsService.getWithdraws(query);
  }

  @Get(':id')
  withdraw(@Param('id') id: string) {
    return this.withdrawsService.findOne(+id);
  }

  @Post(':id/approve')
  approveWithdraw(
    @Param('id') id: string,
    @Body() updateWithdrawDto: ApproveWithdrawDto,
  ) {
    return this.withdrawsService.update(+id, updateWithdrawDto);
  }

  @Delete(':id')
  deleteWithdraw(@Param('id') id: number) {
    return this.withdrawsService.remove(+id);
  }
}
