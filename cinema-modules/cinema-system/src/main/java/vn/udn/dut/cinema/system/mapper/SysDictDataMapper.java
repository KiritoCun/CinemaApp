package vn.udn.dut.cinema.system.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;

import vn.udn.dut.cinema.common.core.constant.UserConstants;
import vn.udn.dut.cinema.common.mybatis.core.mapper.BaseMapperPlus;
import vn.udn.dut.cinema.system.domain.SysDictData;
import vn.udn.dut.cinema.system.domain.vo.SysDictDataVo;

import java.util.List;

/**
 * Dictionary Table Data Layer
 *
 * @author HoaLD
 */
public interface SysDictDataMapper extends BaseMapperPlus<SysDictData, SysDictDataVo> {

    default List<SysDictDataVo> selectDictDataByType(String dictType) {
        return selectVoList(
            new LambdaQueryWrapper<SysDictData>()
                .eq(SysDictData::getStatus, UserConstants.DICT_NORMAL)
                .eq(SysDictData::getDictType, dictType)
                .orderByAsc(SysDictData::getDictSort));
    }
}
